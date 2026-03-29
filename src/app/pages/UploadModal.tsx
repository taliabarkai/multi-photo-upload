import React, { useState, useEffect, useRef } from 'react';
import { useUpload } from '../contexts/UploadContext';
import photoSvgPaths from '../../imports/svg-nbd0r6fnhd';
import iconSvgPaths from '../../imports/svg-8jp3g9yxdw';
import replaceSvgPaths from '../../imports/svg-rrmye4l25l';
import Stepper from '../components/Stepper';
import type { PhotoData } from '../contexts/UploadContext';
import { flushCurrentStepToDraft } from '../utils/modalDraft';

const sampleImages = [
  "https://images.unsplash.com/photo-1545311630-51ea4a4c84de?w=400",
  "https://images.unsplash.com/photo-1668191174012-7d5a78e454a5?w=400",
  "https://images.unsplash.com/photo-1542488410-b822d8fdb272?w=400",
];

interface UploadModalProps {
  step: number;
  onDismissWithDraft: (draft: PhotoData[]) => void;
  onCommitDraft: (draft: PhotoData[]) => void;
  onStepChange: (step: number) => void;
  onGalleryOpen: (stepIndex: number) => void;
  pendingImage: string | null;
  setPendingImage: (image: string | null) => void;
  isEditMode?: boolean;
  persistedDraft?: PhotoData[] | null;
}

export default function UploadModal({
  step,
  onDismissWithDraft,
  onCommitDraft,
  onStepChange,
  onGalleryOpen,
  pendingImage,
  setPendingImage,
  isEditMode = false,
  persistedDraft = null,
}: UploadModalProps) {
  const { photos, totalPhotos, uploadMode } = useUpload();
  
  const currentStep = step;
  
  // Initialize draft state from current photos - sync with actual photos
  const [draftPhotos, setDraftPhotos] = useState<typeof photos>([]);
  
  useEffect(() => {
    const base = photos.map((photo) => ({ ...photo }));
    let initial: PhotoData[];
    if (isEditMode) {
      initial = base;
    } else if (persistedDraft && persistedDraft.length > 0) {
      initial = persistedDraft.map((p) => ({ ...p }));
    } else {
      initial = base;
    }
    setDraftPhotos(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const currentPhoto = draftPhotos[currentStep - 1];
  
  const [localImage, setLocalImage] = useState<string | null>(null);
  const [localName, setLocalName] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [prevStep, setPrevStep] = useState(currentStep);
  const inputRef = useRef<HTMLInputElement>(null);

  const isPersonalizationMode = uploadMode === 'personalization-bulk';

  // Load the current step's photo data whenever draftPhotos or currentStep changes
  useEffect(() => {
    if (draftPhotos.length > 0 && currentPhoto) {
      setLocalImage(currentPhoto.image || null);
      setLocalName(currentPhoto.name || '');
      setCharCount(currentPhoto.name?.length || 0);
    }
  }, [draftPhotos, currentStep]);

  // Auto-focus the name input when step changes
  useEffect(() => {
    if (isPersonalizationMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStep, isPersonalizationMode]);

  // Update local image when pending image changes
  useEffect(() => {
    if (pendingImage) {
      setLocalImage(pendingImage);
      setPendingImage(null); // Clear pending image after using it
    }
  }, [pendingImage, setPendingImage]);

  // Handle step changes
  useEffect(() => {
    if (currentStep !== prevStep) {
      // Save previous photo to draft
      const updatedDrafts = [...draftPhotos];
      updatedDrafts[prevStep - 1] = {
        ...updatedDrafts[prevStep - 1],
        image: localImage,
        name: localName,
      };
      setDraftPhotos(updatedDrafts);
      
      // Load new photo from draft
      const newPhoto = updatedDrafts[currentStep - 1];
      setLocalImage(newPhoto?.image || null);
      setLocalName(newPhoto?.name || '');
      setCharCount(newPhoto?.name.length || 0);
      setZoom(1);
      setRotation(0);
      
      setPrevStep(currentStep);
    }
  }, [currentStep]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.slice(0, 12);
    setLocalName(value);
    setCharCount(value.length);
  };

  const handleUploadClick = () => {
    // Open gallery modal to select photo (pass current step index as 0-based)
    onGalleryOpen(currentStep - 1);
  };

  const handleReplaceClick = () => {
    // Open gallery modal to replace current photo (pass current step index as 0-based)
    onGalleryOpen(currentStep - 1);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3)); // Max zoom 3x
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5)); // Min zoom 0.5x
  };

  const handleRotate = () => {
    setRotation(prev => prev + 90); // Rotate 90 degrees clockwise
  };

  const handleNext = () => {
    // Update draft with current photo
    const updatedDrafts = [...draftPhotos];
    updatedDrafts[currentStep - 1] = {
      ...updatedDrafts[currentStep - 1],
      image: localImage,
      name: localName,
    };
    setDraftPhotos(updatedDrafts);

    if (currentStep < totalPhotos) {
      // Go to next photo
      onStepChange(currentStep + 1);
    } else {
      const committed = flushCurrentStepToDraft(updatedDrafts, currentStep, {
        image: localImage,
        name: localName,
      });
      onCommitDraft(committed);
    }
  };

  const flushAndDismiss = () => {
    const flushed = flushCurrentStepToDraft(draftPhotos, currentStep, {
      image: localImage,
      name: localName,
    });
    onDismissWithDraft(flushed);
  };

  const handleSave = () => {
    flushAndDismiss();
  };

  const handleCancel = () => {
    flushAndDismiss();
  };

  const handleClose = () => {
    flushAndDismiss();
  };

  const handleBack = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    } else {
      flushAndDismiss();
    }
  };

  const handleStepClick = (step: number) => {
    // Save current draft before switching
    const updatedDrafts = [...draftPhotos];
    updatedDrafts[currentStep - 1] = {
      ...updatedDrafts[currentStep - 1],
      image: localImage,
      name: localName,
    };
    setDraftPhotos(updatedDrafts);
    
    onStepChange(step);
  };

  const isNextEnabled = isPersonalizationMode 
    ? localImage !== null && localName.trim() !== ''
    : localImage !== null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      flushAndDismiss();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX !== null && totalPhotos > 1) {
      const touchEndPos = e.changedTouches[0].clientX;
      const swipeDistance = touchStartX - touchEndPos;
      
      if (swipeDistance > 50 && currentStep < totalPhotos && isNextEnabled) {
        handleNext();
      } else if (swipeDistance < -50 && currentStep > 1) {
        handleBack();
      }
    }
    setTouchStartX(null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (totalPhotos > 1) {
      setDragStartX(e.clientX);
      setIsDraggingHorizontal(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && totalPhotos > 1) {
      const deltaX = e.clientX - dragStartX;
      if (Math.abs(deltaX) > 10) {
        setIsDraggingHorizontal(true);
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && isDraggingHorizontal && totalPhotos > 1) {
      const deltaX = e.clientX - dragStartX;
      
      if (deltaX < -50 && currentStep < totalPhotos && isNextEnabled) {
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

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-[16px]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white w-full max-w-[500px] rounded-[8px] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#f5f5f5] relative shrink-0 w-full">
          <div className="flex flex-row items-center size-full">
            <div className="content-stretch flex items-center justify-between p-[12px] relative w-full">
              <p className="font-semibold leading-[18px] not-italic text-[#1e1e1e] text-[14px]">
                <span>{isEditMode ? 'Edit' : 'Add'} Personalization </span>
                <span className="font-normal">({currentStep} of {totalPhotos})</span>
              </p>
              <button onClick={handleClose} className="relative shrink-0 size-[24px] cursor-pointer">
                <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6L18 18" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white relative shrink-0 w-full overflow-y-auto">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] p-[16px] relative w-full">
              
              {/* Stepper - At Top */}
              {totalPhotos > 1 && (
                <div className="w-full flex items-center justify-center">
                  <Stepper currentStep={currentStep} totalSteps={totalPhotos} onStepClick={handleStepClick} />
                </div>
              )}
              
              {/* Image Upload Area */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full px-[24px]">
                <div 
                  className="content-stretch flex flex-col items-center relative rounded-[4px] shrink-0 w-full"
                  onTouchStart={totalPhotos > 1 ? handleTouchStart : undefined}
                  onTouchEnd={totalPhotos > 1 ? handleTouchEnd : undefined}
                  onMouseDown={totalPhotos > 1 ? handleMouseDown : undefined}
                  onMouseUp={totalPhotos > 1 ? handleMouseUp : undefined}
                  onMouseMove={totalPhotos > 1 ? handleMouseMove : undefined}
                  onMouseLeave={totalPhotos > 1 ? handleMouseLeaveArea : undefined}
                >
                  {localImage ? (
                    <>
                      <div className="relative w-full aspect-square overflow-hidden rounded-[4px] border border-[#d0d0d0] border-solid">
                        <img 
                          src={localImage} 
                          alt="Uploaded" 
                          className="w-full h-full object-cover select-none"
                          style={{
                            transform: `scale(${zoom}) rotate(${rotation}deg)`,
                            transformOrigin: 'center',
                          }}
                          draggable={false}
                        />
                        
                        {/* Image controls - Overlaying the image */}
                        <div className="absolute bottom-0 left-0 right-0 content-stretch flex items-center justify-between p-[16px] pointer-events-none">
                          <div className="content-stretch flex gap-[8px] items-center relative shrink-0 pointer-events-auto">
                            {/* Zoom In */}
                            <button 
                              onClick={handleZoomIn}
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer"
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
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer"
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
                              className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px] cursor-pointer"
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
                            className="bg-white content-stretch flex gap-[8px] h-[32px] items-center justify-center overflow-clip p-[12px] relative rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 cursor-pointer pointer-events-auto"
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
                      <div className="relative w-full aspect-square">
                        <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        
                        <button 
                          onClick={handleUploadClick}
                          className="absolute inset-0 content-stretch flex flex-col gap-[8px] items-center justify-center cursor-pointer"
                        >
                          <div className="flex items-center justify-center size-[48px]">
                            <div className="size-[32px]">
                              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
                                <g>
                                  <path clipRule="evenodd" d={photoSvgPaths.p5d7e400} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.p1a1a7140} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.p1a9d1000} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.pe052b40} fill="black" fillRule="evenodd" />
                                </g>
                              </svg>
                            </div>
                          </div>
                          <p className="font-normal leading-[18px] not-italic text-[14px] text-black">Upload image</p>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Name Input (only for personalization mode) */}
              {isPersonalizationMode && (
                <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
                  <div className="content-stretch flex items-center relative shrink-0 w-full">
                    <p className="font-normal leading-[18px] not-italic text-[14px] text-black">Add Name:</p>
                  </div>
                  <div className="h-[48px] relative rounded-[4px] shrink-0 w-full group/input">
                    <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                      <div className="content-stretch flex font-normal items-center justify-between not-italic px-[12px] relative size-full text-black">
                        <input
                          type="text"
                          value={localName}
                          onChange={handleNameChange}
                          placeholder="e.g. John"
                          maxLength={12}
                          autoFocus
                          ref={inputRef}
                          className="flex-1 leading-[18px] text-[16px] outline-none bg-transparent placeholder:text-[#989898]"
                          onKeyDown={(e) => {
                            // Allow Cmd+A (Mac) or Ctrl+A (Windows/Linux) to select all
                            if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                              e.currentTarget.select();
                            }
                          }}
                        />
                        <p className="leading-[14px] relative shrink-0 text-[10px]">{charCount}/12</p>
                      </div>
                    </div>
                    <div aria-hidden="true" className="absolute border border-[#E3E3E3] group-hover/input:border-black group-focus-within/input:border-black border-solid inset-0 pointer-events-none rounded-[4px] transition-colors" />
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <button 
                  onClick={handleCancel}
                  className="content-stretch flex items-center justify-center relative shrink-0"
                >
                  <div aria-hidden="true" className="absolute border-[#1e1e1e] border-b border-solid inset-0 pointer-events-none" />
                  <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    {totalPhotos === 1 ? 'Close' : 'Cancel'}
                  </p>
                </button>
                
                <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
                  {currentStep < totalPhotos && (
                    <button 
                      onClick={handleSave}
                      className="font-semibold leading-[18px] not-italic text-[14px] text-black tracking-[0.14px] uppercase"
                    >
                      save
                    </button>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={!isNextEnabled}
                    className={`content-stretch flex h-[50px] items-center justify-center px-[24px] py-[12px] relative shrink-0 min-w-[112px] ${
                      isNextEnabled ? 'bg-black' : 'bg-[#aeaeae]'
                    }`}
                  >
                    <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.14px] uppercase">
                      {currentStep < totalPhotos 
                        ? 'next' 
                        : 'confirm'
                      }
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}