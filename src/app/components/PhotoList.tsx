import React, { useState, useRef } from 'react';
import { useUpload } from '../contexts/UploadContext';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import svgPaths from '../../imports/svg-mp5s0f8wsa';
import editIconPaths from '../../imports/svg-1jeog19toe';
import plusIconPaths from '../../imports/svg-cqty5kzprz';
import arrowPaths from '../../imports/svg-yaqq1s08pp';
import PhotoWarning from '../../imports/PhotoWarning';
import PhotoError from './PhotoError';
import PhotoErrorIcon from './PhotoErrorIcon';
import WarningPopup from './WarningPopup';
import Icon from '../../imports/Icon-89-533'; // Updated to new drag icon
import ValidationErrorIcon from './ValidationErrorIcon';
import ImageUploadOverlay from './ImageUploadOverlay';
import { colorLabelFromSwatchId } from '../constants/multiPersonalization';
import { isStepCompleteV6 } from '../utils/modalDraft';

/** Mock replacement when user confirms Replace on the low-resolution warning (Pendant 1 flow). */
const MOCK_WARNING_REPLACEMENT_IMAGE =
  'https://images.unsplash.com/photo-1600257729950-13a634d32697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';

interface PhotoListProps {
  uploadMode:
    | 'personalization-bulk'
    | 'personalization-bulk-regular'
    | 'v5a-bulk-multi'
    | 'photo-only'
    | 'image-only';
  onEditPhoto: (index: number) => void;
  onReplacePhoto: (index: number) => void;
  /** Slot index 0-based when user taps a specific empty row; omit for legacy callers. */
  onEmptySlotClick?: (slotIndex?: number) => void;
  /** Called after the slot’s image is cleared (e.g. sync modal draft / validation). */
  onSlotRemove?: (index: number) => void;
  validationErrors?: { [key: number]: { image?: string; name?: string; combined?: string } };
}

interface DraggablePhotoItemProps {
  index: number;
  photo: any;
  hasImage: boolean;
  isPersonalizationMode: boolean;
  uploadMode: string;
  totalPhotos: number;
  validationError?: { image?: string; name?: string; combined?: string };
  onPhotoClick: (index: number) => void;
  onEdit: (index: number) => void;
  onReplace: (index: number) => void;
  onRemove: (index: number) => void;
  onEmptySlotClick: (index: number) => void;
  onSetShowWarningPopup: (value: boolean) => void;
  movePhoto: (fromIndex: number, toIndex: number) => void;
}

const DraggablePhotoItem: React.FC<DraggablePhotoItemProps> = ({
  index,
  photo,
  hasImage,
  isPersonalizationMode,
  uploadMode,
  totalPhotos,
  validationError,
  onPhotoClick,
  onEdit,
  onReplace,
  onRemove,
  onEmptySlotClick,
  onSetShowWarningPopup,
  movePhoto,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { activeUploadSlot, activeUploadProgress, isAnyUploading, isSlotPendingSimulatedUpload } =
    useUpload();
  const slotPending = hasImage && isSlotPendingSimulatedUpload(index);
  const slotActiveUpload = slotPending && activeUploadSlot === index;
  const uploadOverlayProgress = slotActiveUpload ? activeUploadProgress : 0;

  const [{ isDragging }, drag, preview] = useDrag({
    type: 'PHOTO',
    item: { index },
    canDrag: hasImage && totalPhotos > 1 && !isAnyUploading, // Only allow dragging if photo exists and there are multiple photos
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'PHOTO',
    hover: (item: { index: number }) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      
      movePhoto(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Combine drag and drop refs only for items with images
  if (hasImage) {
    drag(drop(ref));
  }

  return (
    <div 
      ref={hasImage ? ref : null}
      className={`relative w-full ${isDragging ? 'opacity-50' : ''} ${isOver && hasImage ? 'border-2 border-blue-500 rounded-[4px]' : ''}`}
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]"/>
      
      {/* X icon overlaying top right corner - only show when image exists */}
      {hasImage && !isAnyUploading && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="absolute top-[-4px] right-[-4px] z-10 p-[4px] bg-[rgb(255,255,255)] rounded-[100px] border border-[#E3E3E3] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer"
        >
          <svg className="block size-[16px]" fill="none" viewBox="0 0 16 16">
            <path d="M12 4L4 12M4 4L12 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <div className="flex flex-row items-center size-full">
        {hasImage ? (
          <div className="flex flex-col gap-[4px] w-full">
            <div className="content-stretch flex gap-[16px] items-center justify-between p-[12px] relative w-full rounded-[4px] group/photoRow">
              <div 
                aria-hidden="true" 
                className="absolute border border-solid border-[#E3E3E3] min-[992px]:group-hover/photoRow:border-black inset-0 pointer-events-none rounded-[4px] transition-colors"
              />
              
              {/* Reorder handle — interactive only when this slot has an image */}
              {totalPhotos > 1 && (
                <div
                  className="flex size-[24px] shrink-0 items-center justify-center text-black"
                  aria-hidden
                >
                  <Icon />
                </div>
              )}

              <button 
                type="button"
                onClick={() => photo.hasError ? onReplace(index) : onPhotoClick(index)}
                className={`flex min-w-0 flex-1 items-center gap-[24px] text-left ${slotPending ? 'pointer-events-none cursor-default' : 'cursor-pointer'}`}
              >
                <div
                  className="relative shrink-0 size-[72px] rounded-[4px] group/image border border-solid border-[#E3E3E3]"
                >
                  {slotPending ? (
                    <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-[#f5f5f5]">
                      <ImageUploadOverlay progress={uploadOverlayProgress} />
                    </div>
                  ) : (uploadMode === 'personalization-bulk' || uploadMode === 'photo-only') ? (
                    // Heart-shaped masked image for V1 and V3
                    <div className="relative w-full h-full overflow-hidden rounded-[4px] bg-white">
                      {/* Background square image */}
                      <img 
                        src={photo.image || ''} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {/* Heart SVG overlay with white background cutting out the heart */}
                      <svg 
                        className="absolute inset-0 w-full h-full pointer-events-none" 
                        viewBox="0 0 300 300" 
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <defs>
                          {/* Gold gradient for heart outline */}
                          <linearGradient id={`goldGradient-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                            <stop offset="50%" style={{ stopColor: '#F4D03F', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#C4A030', stopOpacity: 1 }} />
                          </linearGradient>
                        </defs>
                        
                        {/* White overlay covering everything outside the heart using fill-rule */}
                        <path
                          fillRule="evenodd"
                          d="M 0,0 L 300,0 L 300,300 L 0,300 Z M150,249 C150,249 45,159 45,94 C45,54 70,29 100,29 C120,29 135,39 150,59 C165,39 180,29 200,29 C230,29 255,54 255,94 C255,159 150,249 150,249 Z"
                          fill="white"
                        />
                        
                        {/* Gold heart outline - thicker and more visible */}
                        <path
                          d="M150,249 C150,249 45,159 45,94 C45,54 70,29 100,29 C120,29 135,39 150,59 C165,39 180,29 200,29 C230,29 255,54 255,94 C255,159 150,249 150,249 Z"
                          fill="none"
                          stroke="#D4AF37"
                          strokeWidth="12"
                          strokeLinejoin="round"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  ) : (
                    // Regular rectangular image for other modes
                    <div className="w-full h-full overflow-hidden rounded-[4px]">
                      <img 
                        src={photo.image || ''} 
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  {/* Error icon overlay on top left (priority over warning) */}
                  {!slotPending && photo.hasError && (
                    <div className="absolute top-[8px] left-[8px] size-[24px]">
                      <PhotoErrorIcon />
                    </div>
                  )}
                  {/* Warning icon overlay on top left (only if no error) */}
                  {!slotPending && photo.hasWarning && !photo.hasError && (
                    <div className="absolute top-[8px] left-[8px] size-[24px]">
                      <PhotoWarning />
                    </div>
                  )}
                  {/* Edit/Enlarge icon overlay on bottom right */}
                  {!slotPending && (
                    <div className="absolute bottom-[4px] right-[4px] size-[24px] opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100 transition-opacity">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g>
                          <rect fill="white" fillOpacity="0.4" height="24" rx="8" width="24" />
                          <path d={arrowPaths.p1674a280} fill="#1E1E1E" />
                        </g>
                      </svg>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-[4px]">
                  <p className="font-normal leading-[18px] text-[14px] text-black">
                    {slotPending ? 'Uploading…' : `Pendant ${index + 1}`}
                  </p>
                  {!slotPending && photo.hasError && photo.errorMessage && (
                    <PhotoError message={photo.errorMessage} />
                  )}
                  {!slotPending && photo.hasWarning && (
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSetShowWarningPopup(true);
                      }}
                      className="inline-flex gap-[8px] items-center cursor-pointer text-left"
                    >
                      <p className="font-normal leading-[18px] text-[14px] text-[#f36641]">
                        Low-Resolution Image
                      </p>
                      <div className="cursor-pointer relative shrink-0">
                        <div className="overflow-clip relative size-[12px]">
                          <div className="absolute inset-[8.33%]">
                            <div className="absolute inset-[-10%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
                                <path d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z" stroke="#f36641" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </div>
                          </div>
                          <div className="absolute bottom-[-8.33%] flex items-center justify-center left-1/4 right-[33.33%] top-[-8.33%]">
                            <div className="flex-none h-[14px] w-[5px]">
                              <p className="font-medium leading-[14px] not-italic text-[#f36641] text-[8px] text-center pt-[0px] pr-[0px] pb-[0px] pl-[1px]">?</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  {isPersonalizationMode && !slotPending && (
                    <>
                      {uploadMode === 'v5a-bulk-multi' ? (
                        isStepCompleteV6(photo) ? (
                          <div className="flex flex-col gap-[2px]">
                            <p className="font-semibold leading-[18px] text-[14px] text-black">
                              {photo.photoTitle?.trim()}
                            </p>
                            <p className="font-semibold leading-[18px] text-[14px] text-black">
                              {colorLabelFromSwatchId(photo.colorSwatchId)}
                            </p>
                            <p className="font-semibold leading-[18px] text-[14px] text-black">
                              {photo.frameSizeXL ?? '—'}
                            </p>
                          </div>
                        ) : validationError?.combined ? (
                          <div className="flex gap-[8px] items-center">
                            <ValidationErrorIcon />
                            <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                              {validationError.combined}
                            </p>
                          </div>
                        ) : (
                          <div className="flex gap-[8px] items-center">
                            <ValidationErrorIcon />
                            <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                              Add title, color & frame
                            </p>
                          </div>
                        )
                      ) : photo.name ? (
                        // Saved Name - black with SemiBold
                        <p className="font-semibold leading-[18px] text-[14px] text-black">
                          {photo.name}
                        </p>
                      ) : uploadMode === 'personalization-bulk' ? (
                        // V1 Informative - grey info icon with "No Name Added"
                        <div className="flex gap-[8px] items-center">
                          <svg className="shrink-0 size-[16px]" fill="none" viewBox="0 0 16 16">
                            <circle cx="8" cy="8" r="7" stroke="#989898" strokeWidth="1.5" fill="none" />
                            <path d="M8 7V11M8 5V5.5" stroke="#989898" strokeWidth="1.5" strokeLinecap="round" />
                          </svg>
                          <p className="font-normal leading-[18px] text-[14px] text-[#989898]">
                            No Name Added
                          </p>
                        </div>
                      ) : uploadMode === 'personalization-bulk-regular' ? (
                        // V2 Mandatory - red "Please enter a name" with error icon
                        <div className="flex gap-[8px] items-center">
                          <ValidationErrorIcon />
                          <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                            Please enter a name
                          </p>
                        </div>
                      ) : (
                        // Fallback for other personalization modes
                        <p className="font-normal leading-[20px] text-[14px] text-[#989898]">
                          No Name Added
                        </p>
                      )}
                      {/* Validation error for name - shown below the name (only shows when Add to Bag is clicked) */}
                      {validationError?.name && photo.name && uploadMode !== 'v5a-bulk-multi' && (
                        <div className="flex gap-[8px] items-center">
                          <ValidationErrorIcon />
                          <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                            {validationError.name}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </button>

              <button
                type="button"
                disabled={slotPending}
                onClick={() => (photo.hasError ? onReplace(index) : onEdit(index))}
                className={`font-semibold leading-[18px] text-[14px] pr-[8px] underline decoration-solid text-black ${
                  slotPending ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
                }`}
              >
                {photo.hasError ? 'Replace' : 'Edit'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-col gap-[4px]">
            <div className="group/emptySlot relative flex w-full items-center gap-[16px] rounded-[4px] p-[12px]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[4px] border border-solid border-[#E3E3E3] min-[992px]:group-hover/emptySlot:border-black transition-colors"
              />

              {/* Reorder handle: not draggable without an image — lighter grey, no interaction */}
              {totalPhotos > 1 && (
                <div
                  className="flex size-[24px] shrink-0 items-center justify-center opacity-[0.35] pointer-events-none select-none text-[#9ca3af]"
                  aria-hidden
                >
                  <Icon />
                </div>
              )}

              <button
                type="button"
                onClick={() => onEmptySlotClick(index)}
                className="relative flex min-w-0 flex-1 cursor-pointer items-center gap-[24px] text-left"
              >
                <div
                  className="relative flex size-[72px] shrink-0 items-center justify-center rounded-[4px] border border-solid border-[#E3E3E3] bg-[#f5f5f5]"
                >
                  <div className="relative size-[32px] shrink-0">
                    <div className="relative size-full overflow-clip rounded-[inherit]">
                      <div className="absolute inset-[12.5%_12.49%_12.5%_12.51%]">
                        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                          <path d={plusIconPaths.pbc71b00} fill="black" stroke="black" strokeWidth="0.216" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex min-h-px min-w-0 flex-1 flex-col items-start gap-[4px] not-italic">
                  <p className="relative shrink-0 text-[14px] font-semibold leading-[18px] text-black">
                    Pendant {index + 1}
                  </p>
                  <p className="relative shrink-0 whitespace-pre-wrap text-[12px] font-normal leading-[16px] text-[#989898]">
                    Click to upload photo
                  </p>
                </div>
              </button>
            </div>
            
            {/* Validation error below the button - V1/V2 */}
            {validationError?.combined ? (
              <div className="flex gap-[8px] items-center">
                <ValidationErrorIcon />
                <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                  {validationError.combined}
                </p>
              </div>
            ) : validationError?.image && (
              <div className="flex gap-[8px] items-center">
                <ValidationErrorIcon />
                <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                  {validationError.image}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

function PhotoListContent({
  uploadMode,
  onEditPhoto,
  onReplacePhoto,
  onEmptySlotClick,
  onSlotRemove,
  validationErrors,
}: PhotoListProps) {
  const { photos, totalPhotos, deletePhoto, reorderPhotos, updatePhoto, beginSimulatedUpload } =
    useUpload();
  const [showWarningPopup, setShowWarningPopup] = useState(false);
  
  const uploadedCount = photos.slice(0, totalPhotos).filter(p => p.image !== null).length;

  const handleEdit = (index: number) => {
    onEditPhoto(index);
  };

  const handleReplace = (index: number) => {
    onReplacePhoto(index);
  };

  const handleRemove = (index: number) => {
    deletePhoto(index);
    onSlotRemove?.(index);
  };

  const handleSpecificEmptySlotClick = (index: number) => {
    if (onEmptySlotClick) {
      onEmptySlotClick(index);
    } else {
      onEditPhoto(index);
    }
  };
  
  const handlePhotoClick = (index: number) => {
    if (uploadMode === 'image-only') {
      onEditPhoto(index);
    } else {
      handleEdit(index);
    }
  };

  const movePhoto = (fromIndex: number, toIndex: number) => {
    reorderPhotos(fromIndex, toIndex);
  };

  const isPersonalizationMode =
    uploadMode === 'personalization-bulk' ||
    uploadMode === 'personalization-bulk-regular' ||
    uploadMode === 'v5a-bulk-multi';

  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-center justify-between not-italic relative w-full text-[14px] m-[0px]">
        <p className="leading-[18px] text-black">
          <span className="font-semibold">
            {uploadMode === 'photo-only' || uploadMode === 'image-only' 
              ? `Upload your photo${totalPhotos > 1 ? 's' : ''}` 
              : 'Personalize your pendants'}
          </span>
          <span className="text-[rgb(102,102,102)]"> (</span>
          <span className="text-[rgb(102,102,102)]">{uploadedCount} of {totalPhotos}</span>
          <span className="text-[rgb(102,102,102)]">):</span>
        </p>
      </div>

      {Array.from({ length: totalPhotos }).map((_, index) => {
        const photo = photos[index];
        const hasImage = photo?.image !== null;

        return (
          <DraggablePhotoItem
            key={index}
            index={index}
            photo={photo}
            hasImage={hasImage}
            isPersonalizationMode={isPersonalizationMode}
            uploadMode={uploadMode}
            totalPhotos={totalPhotos}
            validationError={validationErrors?.[index]}
            onPhotoClick={handlePhotoClick}
            onEdit={handleEdit}
            onReplace={handleReplace}
            onRemove={handleRemove}
            onEmptySlotClick={handleSpecificEmptySlotClick}
            onSetShowWarningPopup={setShowWarningPopup}
            movePhoto={movePhoto}
          />
        );
      })}
      
      {/* Warning Popup Modal */}
      {showWarningPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="max-w-[343px] w-[calc(100%-32px)] min-[992px]:max-w-[500px]">
            <WarningPopup
              pendantLabel="Pendant 1"
              onClose={() => setShowWarningPopup(false)}
              onReplace={() => {
                const warningPhotoIndex = photos.findIndex((p) => p.hasWarning);
                if (warningPhotoIndex === 0) {
                  updatePhoto(0, {
                    image: MOCK_WARNING_REPLACEMENT_IMAGE,
                    hasWarning: false,
                    hasError: false,
                    errorMessage: undefined,
                  });
                  beginSimulatedUpload([0]);
                } else if (warningPhotoIndex !== -1) {
                  onReplacePhoto(warningPhotoIndex);
                }
                setShowWarningPopup(false);
              }}
            />
            <div 
              className="fixed inset-0 -z-10" 
              onClick={() => setShowWarningPopup(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function PhotoList(props: PhotoListProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <PhotoListContent {...props} />
    </DndProvider>
  );
}