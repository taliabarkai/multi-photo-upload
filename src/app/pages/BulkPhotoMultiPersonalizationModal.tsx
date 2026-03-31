import React, { useState, useEffect } from 'react';
import { useUpload, type PhotoData } from '../contexts/UploadContext';
import {
  mergePendingImagesIntoDraft,
  mergeIeWithPersistedDraft,
  flushCurrentStepToDraft,
  getCompletedPrefixLengthV6,
  getCompletedPrefixLengthImageOnly,
  getFirstIncompleteStepV6,
  getFirstIncompleteStepImageOnly,
} from '../utils/modalDraft';
import svgPaths from '../../imports/svg-bkftxep4pk';
import iconSvgPaths from '../../imports/svg-8jp3g9yxdw';
import replaceSvgPaths from '../../imports/svg-rrmye4l25l';
import photoSvgPaths from '../../imports/svg-nbd0r6fnhd';
import PhotoWarning from '../../imports/PhotoWarning';
import Stepper from '../components/Stepper';
import { COLOR_SWATCHES } from '../constants/multiPersonalization';

interface BulkPhotoMultiPersonalizationModalProps {
  step: number;
  /** Save & Close — V2 commits completed prefix to IE; V1 keeps prior “dismiss without IE” behavior */
  onSaveAndClose: (draft: PhotoData[]) => void;
  onDismissWithDraft: (draft: PhotoData[]) => void;
  onCommitDraft: (draft: PhotoData[]) => void;
  onStepChange: (step: number) => void;
  onGalleryOpen: (stepIndex: number) => void;
  pendingImage: string | null;
  setPendingImage: (image: string | null) => void;
  isEditMode?: boolean;
  pendingDraftImages?: string[]; // New images to be added
  /** Restored wizard state when reopening after dismiss without committing */
  persistedDraft?: PhotoData[] | null;
  /** V5 B: modal is image upload only; title/color/frame are edited on the product page */
  imageOnly?: boolean;
  /**
   * Single-image flow: when set, the modal edits ONLY this pendant slot (0-based),
   * with no stepper and no coupling to other images.
   */
  singleSlotIndex?: number | null;
}

export default function BulkPhotoMultiPersonalizationModal({
  step,
  onSaveAndClose,
  onDismissWithDraft,
  onCommitDraft,
  onStepChange,
  onGalleryOpen,
  pendingImage,
  setPendingImage,
  isEditMode = false,
  pendingDraftImages = [],
  persistedDraft = null,
  imageOnly = false,
  singleSlotIndex = null,
}: BulkPhotoMultiPersonalizationModalProps) {
  const { photos, totalPhotos } = useUpload();
  
  const isSingleSlot = singleSlotIndex !== null && singleSlotIndex !== undefined;
  const totalSteps = isSingleSlot ? 1 : totalPhotos;
  const currentStep = isSingleSlot ? 1 : step;
  /** V5 B + single-slot: no stepper; no swipe/keys to change pendant — only edit the current image */
  const allowStepNavigationGestures = !isSingleSlot && totalSteps > 1 && !imageOnly;

  // Initialize draft state from current photos - sync with actual photos
  const [draftPhotos, setDraftPhotos] = useState<typeof photos>([]);
  
  // Initialize draft once on mount (parent `key` resets the modal when reopening)
  useEffect(() => {
    if (isSingleSlot) {
      const slot = Math.min(Math.max(0, singleSlotIndex as number), totalPhotos - 1);
      setDraftPhotos([{ ...photos[slot] }]);
      return;
    }

    const base = photos.map((photo) => ({ ...photo }));
    let initial: PhotoData[];
    if (isEditMode) {
      initial = base;
    } else if (pendingDraftImages.length > 0) {
      initial = mergePendingImagesIntoDraft(base, pendingDraftImages, isEditMode);
    } else {
      initial = mergeIeWithPersistedDraft(photos, persistedDraft, totalPhotos).map((p) => ({ ...p }));
    }
    setDraftPhotos(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mount-only init
  }, []);
  
  const currentPhoto = draftPhotos[currentStep - 1];
  
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [localTitle, setLocalTitle] = useState('');
  const [localColorId, setLocalColorId] = useState<string>('1');
  const [localFrameSize, setLocalFrameSize] = useState<'S' | 'M' | 'L' | 'XL'>('M');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDraggingImage, setIsDraggingImage] = useState(false);
  const [imageDragStart, setImageDragStart] = useState({ x: 0, y: 0 });
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [wheelDeltaX, setWheelDeltaX] = useState(0);
  const wheelTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [prevStep, setPrevStep] = useState(currentStep);

  // Load the current step's photo data whenever draftPhotos or currentStep changes
  useEffect(() => {
    if (draftPhotos.length > 0 && currentPhoto) {
      setLocalImage(currentPhoto.image || null);
      setLocalTitle(currentPhoto.photoTitle || '');
      setLocalColorId(currentPhoto.colorSwatchId || '1');
      setLocalFrameSize(currentPhoto.frameSizeXL || 'M');
    }
  }, [draftPhotos, currentStep]);

  // Update local image when pending image changes
  useEffect(() => {
    if (pendingImage) {
      setLocalImage(pendingImage);
      // Use setTimeout to defer the state update to avoid setState during render warning
      setTimeout(() => {
        setPendingImage(null);
      }, 0);
    }
  }, [pendingImage, setPendingImage]);

  // Handle step changes
  useEffect(() => {
    if (isSingleSlot) return;
    if (currentStep !== prevStep) {
      // Save previous photo to draft
      const updatedDrafts = [...draftPhotos];
      updatedDrafts[prevStep - 1] = imageOnly
        ? {
            ...updatedDrafts[prevStep - 1],
            image: localImage,
            name: '',
          }
        : {
            ...updatedDrafts[prevStep - 1],
            image: localImage,
            name: '',
            photoTitle: localTitle,
            colorSwatchId: localColorId,
            frameSizeXL: localFrameSize,
          };
      setDraftPhotos(updatedDrafts);
      
      // Load new photo from draft
      const newPhoto = updatedDrafts[currentStep - 1];
      setLocalImage(newPhoto?.image || null);
      setLocalTitle(newPhoto?.photoTitle || '');
      setLocalColorId(newPhoto?.colorSwatchId || '1');
      setLocalFrameSize(newPhoto?.frameSizeXL || 'M');
      setZoom(1);
      setRotation(0);
      setPosition({ x: 0, y: 0 });
      setIsDraggingImage(false);
      setImageDragStart({ x: 0, y: 0 });
      setDragStartX(null);
      setIsDraggingHorizontal(false);
      setTouchStartX(null);
      setWheelDeltaX(0);
      
      setPrevStep(currentStep);
    }
  }, [currentStep]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalTitle(e.target.value.slice(0, 80));
  };

  const currentStepPatch = (): Partial<PhotoData> =>
    imageOnly
      ? { image: localImage, name: '' }
      : {
          image: localImage,
          name: '',
          photoTitle: localTitle,
          colorSwatchId: localColorId,
          frameSizeXL: localFrameSize,
        };

  const expandSingleDraft = (singleDraft: PhotoData[]): PhotoData[] => {
    if (!isSingleSlot) return singleDraft;
    const slot = Math.min(Math.max(0, singleSlotIndex as number), totalPhotos - 1);
    const base = photos.slice(0, totalPhotos).map((p) => ({ ...p }));
    base[slot] = { ...base[slot], ...singleDraft[0] };
    return base;
  };

  const handleUploadClick = () => {
    const targetIndex = isSingleSlot
      ? Math.min(Math.max(0, singleSlotIndex as number), totalPhotos - 1)
      : currentStep - 1;
    onGalleryOpen(targetIndex);
  };

  const handleReplaceClick = () => {
    const targetIndex = isSingleSlot
      ? Math.min(Math.max(0, singleSlotIndex as number), totalPhotos - 1)
      : currentStep - 1;
    onGalleryOpen(targetIndex);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90);
  };

  const handleNext = () => {
    const updatedDrafts = [...draftPhotos];
    updatedDrafts[currentStep - 1] = {
      ...updatedDrafts[currentStep - 1],
      ...currentStepPatch(),
    };
    setDraftPhotos(updatedDrafts);

    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    } else {
      const committed = flushCurrentStepToDraft(updatedDrafts, currentStep, currentStepPatch());
      onCommitDraft(expandSingleDraft(committed));
    }
  };

  const flushAndDismiss = () => {
    const flushed = flushCurrentStepToDraft(draftPhotos, currentStep, currentStepPatch());
    onDismissWithDraft(expandSingleDraft(flushed));
  };

  const draftWithCurrentStep = flushCurrentStepToDraft(draftPhotos, currentStep, currentStepPatch());
  const saveAndCloseDisabled = isSingleSlot
    ? !isNextEnabled
    : draftPhotos.length === 0 ||
      (imageOnly
        ? getCompletedPrefixLengthImageOnly(draftWithCurrentStep, totalPhotos) === 0
        : getCompletedPrefixLengthV6(draftWithCurrentStep, totalPhotos) === 0);

  const handleSave = () => {
    if (saveAndCloseDisabled) return;
    onSaveAndClose(expandSingleDraft(flushCurrentStepToDraft(draftPhotos, currentStep, currentStepPatch())));
  };

  const handleCancel = () => {
    flushAndDismiss();
  };

  const handleClose = () => {
    flushAndDismiss();
  };

  const handleBack = () => {
    if (isSingleSlot) {
      flushAndDismiss();
      return;
    }
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    } else {
      flushAndDismiss();
    }
  };

  /** Cannot jump past the first step that still needs personalization */
  const handleStepperNavigate = (step: number) => {
    const flushed = flushCurrentStepToDraft(draftPhotos, currentStep, currentStepPatch());
    const maxAllowed = imageOnly
      ? getFirstIncompleteStepImageOnly(flushed, totalPhotos)
      : getFirstIncompleteStepV6(flushed, totalPhotos);
    if (step > maxAllowed) return;
    const updatedDrafts = [...draftPhotos];
    updatedDrafts[currentStep - 1] = {
      ...updatedDrafts[currentStep - 1],
      ...currentStepPatch(),
    };
    setDraftPhotos(updatedDrafts);
    onStepChange(step);
  };

  const isNextEnabled = imageOnly
    ? localImage !== null
    : localImage !== null &&
      localTitle.trim() !== '' &&
      !!localColorId &&
      !!localFrameSize;

  // Keyboard navigation (V5 B: disabled — single-image edit focus)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!allowStepNavigationGestures) return;
      
      if (e.key === 'ArrowLeft' && currentStep > 1) {
        e.preventDefault();
        handleBack();
      } else if (e.key === 'ArrowRight' && currentStep < totalSteps && isNextEnabled) {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep, allowStepNavigationGestures, isNextEnabled]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      flushAndDismiss();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null && allowStepNavigationGestures) {
      const touchEndPos = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndPos;
      
      if (swipeDistance > 50 && currentStep < totalSteps && isNextEnabled) {
        handleNext();
      } else if (swipeDistance < -50 && currentStep > 1) {
        handleBack();
      }
    }
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (allowStepNavigationGestures) {
      setDragStartX(e.clientX);
      setIsDraggingHorizontal(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && allowStepNavigationGestures) {
      const deltaX = e.clientX - dragStartX;
      if (Math.abs(deltaX) > 10) {
        setIsDraggingHorizontal(true);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && isDraggingHorizontal && allowStepNavigationGestures) {
      const deltaX = e.clientX - dragStartX;
      
      if (deltaX < -50 && currentStep < totalSteps && isNextEnabled) {
        handleNext();
      } else if (deltaX > 50 && currentStep > 1) {
        handleBack();
      }
    }
    setDragStartX(null);
    setIsDraggingHorizontal(false);
  };

  const handleMouseLeaveArea = () => {
    setDragStartX(null);
    setIsDraggingHorizontal(false);
  };

  const handleImageMouseDown = (e: React.MouseEvent<HTMLImageElement>) => {
    setIsDraggingImage(true);
    setImageDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleImageMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (isDraggingImage) {
      const deltaX = e.clientX - imageDragStart.x;
      const deltaY = e.clientY - imageDragStart.y;
      setPosition(prev => ({ x: prev.x + deltaX, y: prev.y + deltaY }));
      setImageDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
  };

  const handleImageMouseLeave = () => {
    setIsDraggingImage(false);
  };

  const handleImageWheel = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
  };

  const handleContainerWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (allowStepNavigationGestures && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      // Horizontal trackpad swipe detected
      setWheelDeltaX(prev => {
        const newDelta = prev + e.deltaX;
        
        // Navigate when threshold is reached
        if (newDelta > 100 && currentStep < totalSteps && isNextEnabled) {
          handleNext();
          return 0; // Reset
        } else if (newDelta < -100 && currentStep > 1) {
          handleBack();
          return 0; // Reset
        }
        
        return newDelta;
      });
      
      // Reset after a delay to prevent accumulation
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      wheelTimeoutRef.current = setTimeout(() => {
        setWheelDeltaX(0);
      }, 300);
    }
  };

  const showSaveAndClose = !isSingleSlot && totalSteps > 1 && currentStep < totalSteps;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[16px]"
      onClick={handleBackdropClick}
    >
      <div className="flex w-full max-w-[500px] min-h-0 max-h-[min(90vh,90dvh)] flex-col overflow-hidden rounded-[8px] bg-white">
        <div className="z-10 w-full shrink-0 border-b border-[#e8e8e8] bg-[#f5f5f5]">
          <div className="flex size-full flex-row items-center">
            <div className="relative flex w-full items-center justify-between p-[12px]">
              <p className="text-[14px] font-semibold leading-[18px] not-italic text-[#1e1e1e]">
                {imageOnly
                  ? isEditMode
                    ? 'Edit image'
                    : 'Add image'
                  : `${isEditMode ? 'Edit' : 'Add'} Personalization`}
              </p>
              <button type="button" onClick={handleClose} className="relative size-[24px] shrink-0 cursor-pointer">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable inner: stepper, image, personalization fields, warning — not actions */}
        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain bg-white [scrollbar-gutter:stable]">
          <div className="relative flex w-full flex-col items-start gap-[16px] p-[16px]">
              
              {/* Pagination (V5 A only — V5 B is single-image edit, no stepper) */}
              {allowStepNavigationGestures && (
                <div className="w-full flex items-center justify-center">
                  <Stepper currentStep={currentStep} totalSteps={totalSteps} onStepClick={handleStepperNavigate} />
                </div>
              )}

              {allowStepNavigationGestures && (
                <p className="w-full text-center text-[14px] font-normal leading-[18px] text-black">
                  Pendant {currentStep} of {totalSteps}
                </p>
              )}
              
              {/* Image Upload Area - Regular Photo (not SVG editor) */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div 
                  className="content-stretch flex flex-col items-center relative rounded-[4px] shrink-0 w-full"
                  onTouchStart={allowStepNavigationGestures ? handleTouchStart : undefined}
                  onTouchEnd={allowStepNavigationGestures ? handleTouchEnd : undefined}
                  onMouseDown={allowStepNavigationGestures ? handleMouseDown : undefined}
                  onMouseUp={allowStepNavigationGestures ? handleMouseUp : undefined}
                  onMouseMove={allowStepNavigationGestures ? handleMouseMove : undefined}
                  onMouseLeave={allowStepNavigationGestures ? handleMouseLeaveArea : undefined}
                  onWheel={allowStepNavigationGestures ? handleContainerWheel : undefined}
                >
                  {localImage ? (
                    <>
                      <div className="relative w-full aspect-square overflow-hidden rounded-[4px] border border-[#d0d0d0] border-solid">
                        <img 
                          src={localImage} 
                          alt="Uploaded" 
                          className="w-full h-full object-cover select-none"
                          style={{
                            transform: `scale(${zoom}) rotate(${rotation}deg) translate(${position.x}px, ${position.y}px)`,
                            transformOrigin: 'center',
                          }}
                          draggable={false}
                          onMouseDown={handleImageMouseDown}
                          onMouseMove={handleImageMouseMove}
                          onMouseUp={handleImageMouseUp}
                          onMouseLeave={handleImageMouseLeave}
                          onWheel={handleImageWheel}
                        />
                        
                        {/* Warning icon overlay on top left (V5 B image-only: no low-res warning) */}
                        {!imageOnly && currentPhoto?.hasWarning && (
                          <div className="absolute top-[16px] left-[16px] size-[32px]">
                            <div className="relative size-full scale-[1.33] origin-center">
                              <PhotoWarning />
                            </div>
                          </div>
                        )}
                        
                        {/* Image controls - Overlaying the image */}
                        <div className="absolute bottom-0 left-0 right-0 content-stretch flex items-center justify-between p-[16px] pointer-events-none">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 pointer-events-auto">
                            {/* Zoom In */}
                            <button 
                              onClick={handleZoomIn}
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer hover:bg-gray-100"
                            >
                              <div className="overflow-clip relative shrink-0 size-[20px]">
                                <div className="absolute inset-[15%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                    <path d={iconSvgPaths.p10022c00} fill="#1E1E1E" />
                                    <path clipRule="evenodd" d={iconSvgPaths.pfcdd300} fill="#1E1E1E" fillRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                            
                            {/* Zoom Out */}
                            <button 
                              onClick={handleZoomOut}
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer hover:bg-gray-100"
                            >
                              <div className="overflow-clip relative shrink-0 size-[20px]">
                                <div className="absolute inset-[15%]">
                                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
                                    <path d={iconSvgPaths.pc463800} fill="#1E1E1E" />
                                    <path clipRule="evenodd" d={iconSvgPaths.pfcdd300} fill="#1E1E1E" fillRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                            
                            {/* Rotate */}
                            <button 
                              onClick={handleRotate}
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer hover:bg-gray-100"
                            >
                              <div className="flex items-center justify-center relative shrink-0">
                                <div className="-scale-y-100 flex-none rotate-180">
                                  <div className="overflow-clip relative size-[20px]">
                                    <div className="absolute flex inset-[12.5%] items-center justify-center">
                                      <div className="-scale-y-100 flex-none rotate-180 size-[15px]">
                                        <div className="relative size-full">
                                          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
                                            <path d={iconSvgPaths.p1f653180} fill="#1E1E1E" />
                                            <path d={iconSvgPaths.p65bac00} stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
                                            <path d={iconSvgPaths.p21ab7400} stroke="#1E1E1E" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          </div>
                          
                          <button 
                            onClick={handleReplaceClick}
                            className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip p-[12px] relative rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 cursor-pointer pointer-events-auto hover:bg-gray-100"
                          >
                            <div className="relative size-[16px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 13.3333 11.7817">
                                <g clipPath="url(#clip0_3_125)">
                                  <path clipRule="evenodd" d={replaceSvgPaths.p3b43f00} fill="#1E1E1E" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={replaceSvgPaths.p34b9ba00} fill="#1E1E1E" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={replaceSvgPaths.p2fbfe400} fill="#1E1E1E" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={replaceSvgPaths.pc4c3192} fill="#1E1E1E" fillRule="evenodd" />
                                </g>
                                <defs>
                                  <clipPath id="clip0_3_125">
                                    <rect fill="white" height="11.7817" width="13.3333" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
                            <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#1e1e1e] text-[12px]">Replace</p>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={handleUploadClick}
                        className="relative w-full aspect-square cursor-pointer"
                      >
                        <div aria-hidden="true" className="absolute border border-[#E3E3E3] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        <div className="absolute inset-0 flex flex-col gap-[8px] items-center justify-center">
                          <div className="relative shrink-0 size-[32px]">
                            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                              <g clipPath="url(#clip0_1_66586)">
                                <path clipRule="evenodd" d={photoSvgPaths.p5d7e400} fill="black" fillRule="evenodd" />
                                <path clipRule="evenodd" d={photoSvgPaths.p1a1a7140} fill="black" fillRule="evenodd" />
                                <path clipRule="evenodd" d={photoSvgPaths.p1a9d1000} fill="black" fillRule="evenodd" />
                                <path clipRule="evenodd" d={photoSvgPaths.pe052b40} fill="black" fillRule="evenodd" />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_66586">
                                  <rect fill="white" height="32" width="32" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                          <p className="font-normal leading-[16px] not-italic text-[14px] text-black">Upload image</p>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Per-image personalization (V6): title, color, frame — hidden in V5 B image-only modal */}
              {!imageOnly && (
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
                <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
                  <label className="font-normal leading-[18px] text-[14px] text-black w-full" htmlFor={`ie-title-${currentStep}`}>
                    Title
                  </label>
                  <div className="h-[48px] relative rounded-[4px] shrink-0 w-full group/input">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex font-normal items-center not-italic px-[12px] relative size-full text-black bg-white">
                        <input
                          id={`ie-title-${currentStep}`}
                          type="text"
                          value={localTitle}
                          onChange={handleTitleChange}
                          placeholder="e.g. Our Wedding Song"
                          maxLength={80}
                          className="flex-1 leading-[18px] text-[16px] outline-none bg-transparent placeholder:text-[#989898]"
                        />
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#E3E3E3] group-hover/input:border-black group-focus-within/input:border-black border-solid inset-0 pointer-events-none rounded-[4px] transition-colors" />
                  </div>
                </div>

                <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
                  <p className="font-normal leading-[18px] text-[14px] text-black">
                    Color –{' '}
                    {COLOR_SWATCHES.find((s) => s.id === localColorId)?.label ?? '—'}
                  </p>
                  <div className="flex flex-wrap gap-[12px]" role="radiogroup" aria-label="Frame color">
                    {COLOR_SWATCHES.map((sw) => (
                      <button
                        key={sw.id}
                        type="button"
                        role="radio"
                        aria-checked={localColorId === sw.id}
                        aria-label={sw.label}
                        onClick={() => setLocalColorId(sw.id)}
                        className={`relative size-[40px] shrink-0 rounded-full border-2 transition-colors ${
                          localColorId === sw.id ? 'border-black ring-2 ring-offset-2 ring-black/20' : 'border-white shadow-sm'
                        } ${sw.className}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="content-stretch flex flex-col gap-[8px] items-start w-full">
                  <p className="font-normal leading-[18px] text-[14px] text-black">Frame size</p>
                  <div className="flex flex-wrap gap-[8px]">
                    {(['S', 'M', 'L', 'XL'] as const).map((fs) => (
                      <button
                        key={fs}
                        type="button"
                        onClick={() => setLocalFrameSize(fs)}
                        className={`min-w-[44px] px-[14px] py-[8px] rounded-[4px] border border-solid font-medium text-[14px] transition-colors ${
                          localFrameSize === fs
                            ? 'border-black bg-black text-white'
                            : 'border-[#E3E3E3] bg-white text-black min-[992px]:hover:border-black'
                        }`}
                      >
                        {fs}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              )}

              {/* Low-Resolution Warning Banner (V5 B image-only: hidden) */}
              {!imageOnly && currentPhoto?.hasWarning && (
                <div className="bg-[#f5f5f5] w-full p-[12px] rounded-[4px]">
                  <div className="flex gap-[12px] items-start w-full">
                    <div className="flex flex-col gap-[4px] flex-1">
                      <div className="flex gap-[12px] items-center">
                        <div className="overflow-clip relative shrink-0 size-[24px]">
                          <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.012px] left-[calc(50%+0.2px)] top-[calc(50%+0.2px)] w-[16.68px]">
                            <div className="absolute inset-[-5.55%_-5%]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3466 16.6783">
                                <g>
                                  <path d="M1.02637 15.0117L8.34637 1.67833C8.48554 1.43469 8.69008 1.23411 8.93742 1.09957C9.18476 0.965028 9.46566 0.89209 9.75264 0.89209C10.0396 0.89209 10.3205 0.965028 10.5679 1.09957C10.8152 1.23411 11.0197 1.43469 11.1589 1.67833L18.4789 15.0117C18.6163 15.2522 18.686 15.5255 18.6806 15.803C18.6752 16.0805 18.5949 16.3508 18.4485 16.5858C18.3021 16.8208 18.0949 17.0117 17.8486 17.1387C17.6024 17.2657 17.3264 17.3242 17.0456 17.3083H2.45971C2.17889 17.3242 1.90286 17.2657 1.65664 17.1387C1.41042 17.0117 1.20322 16.8208 1.05682 16.5858C0.910423 16.3508 0.830127 16.0805 0.824699 15.803C0.81927 15.5255 0.889003 15.2522 1.02637 15.0117Z" fill="#F36641" stroke="#F36641" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
                                  <g>
                                    <path d="M9.1815 5.84488V9.17822Z" fill="white" />
                                    <path d="M9.1815 5.84488V9.17822" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
                                  </g>
                                  <g>
                                    <path d="M9.1815 12.5115H9.18879Z" fill="white" />
                                    <path d="M9.1815 12.5115H9.18879" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
                                  </g>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <p className="font-semibold leading-[18px] text-[14px] text-black">Low-Resolution Image</p>
                      </div>
                      <p className="font-normal !text-[14px] leading-[18px] text-black">
                        {`We recommend uploading a higher-quality image. You can continue, but we’re not responsible if it appears blurry.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Sticky footer: primary actions always visible */}
        <div className="shrink-0 border-t border-[#e8e8e8] bg-white px-[16px] py-[14px]">
          <div
            className={`flex w-full flex-wrap items-center gap-y-[12px] gap-x-[16px] ${
              showSaveAndClose ? 'justify-between' : 'justify-end'
            }`}
          >
            {showSaveAndClose && (
              <button
                type="button"
                onClick={handleSave}
                disabled={saveAndCloseDisabled}
                title={
                  saveAndCloseDisabled
                    ? imageOnly
                      ? 'Upload images from Image 1 forward (at least one step) to save and close'
                      : 'Complete personalization from Image 1 forward (at least one step) to save and close'
                    : undefined
                }
                className={`relative flex shrink-0 items-center justify-center ${
                  saveAndCloseDisabled ? 'cursor-not-allowed opacity-40' : ''
                }`}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-b border-solid border-[#1e1e1e]" />
                <span className="relative text-[14px] font-semibold leading-[18px] not-italic text-[#1e1e1e]">
                  Save & Close
                </span>
              </button>
            )}

            <div className="flex shrink-0 items-center gap-[24px]">
              {totalSteps > 1 && currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-[14px] font-semibold uppercase leading-[18px] tracking-[0.14px] text-black"
                >
                  back
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={!isNextEnabled}
                className={`flex h-[50px] min-w-[112px] shrink-0 items-center justify-center px-[24px] py-[12px] ${
                  isNextEnabled ? 'bg-black' : 'bg-[#aeaeae]'
                }`}
              >
                <span className="text-[14px] font-semibold uppercase leading-[18px] tracking-[0.14px] text-white">
                  {currentStep < totalSteps ? 'next' : 'confirm'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}