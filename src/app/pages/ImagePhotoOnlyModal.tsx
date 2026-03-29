import React, { useState, useEffect } from 'react';
import { useUpload } from '../contexts/UploadContext';
import Arrow from '../../imports/Arrow';
import svgPaths from '../../imports/svg-bkftxep4pk';
import iconSvgPaths from '../../imports/svg-8jp3g9yxdw';
import replaceSvgPaths from '../../imports/svg-rrmye4l25l';
import photoSvgPaths from '../../imports/svg-nbd0r6fnhd';
import PhotoWarning from '../../imports/PhotoWarning';
import PhotoErrorIcon from '../components/PhotoErrorIcon';
import Stepper from '../components/Stepper';
import ErrorPopup from '../components/ErrorPopup';
import type { PhotoData } from '../contexts/UploadContext';
import { flushCurrentStepToDraft } from '../utils/modalDraft';

interface ImagePhotoOnlyModalProps {
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

export default function ImagePhotoOnlyModal({
  step,
  onDismissWithDraft,
  onCommitDraft,
  onStepChange,
  onGalleryOpen,
  pendingImage,
  setPendingImage,
  isEditMode = false,
  persistedDraft = null,
}: ImagePhotoOnlyModalProps) {
  const { photos, totalPhotos } = useUpload();
  
  const currentStep = step;
  
  const [draftPhotos, setDraftPhotos] = useState<PhotoData[]>([]);
  
  const currentPhoto = draftPhotos[currentStep - 1];
  
  const [localImage, setLocalImage] = useState<string | null>(null);
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
    const ph = initial[currentStep - 1];
    setLocalImage(ph?.image ?? null);
    setPrevStep(currentStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update local image when pending image changes (gallery replace while modal open)
  useEffect(() => {
    if (pendingImage) {
      setLocalImage(pendingImage);
      setDraftPhotos((prev) => {
        const next = [...prev];
        const i = currentStep - 1;
        if (i >= 0 && i < next.length) {
          next[i] = {
            ...next[i],
            image: pendingImage,
            hasError: false,
            errorMessage: undefined,
            hasWarning: false,
          };
        }
        return next;
      });
      // Use setTimeout to defer the state update to avoid setState during render warning
      setTimeout(() => {
        setPendingImage(null);
      }, 0);
    }
  }, [pendingImage, setPendingImage, currentStep]);

  // Handle step changes
  useEffect(() => {
    if (currentStep !== prevStep) {
      // Save previous photo to draft
      const updatedDrafts = [...draftPhotos];
      updatedDrafts[prevStep - 1] = {
        ...updatedDrafts[prevStep - 1],
        image: localImage,
      };
      setDraftPhotos(updatedDrafts);
      
      // Load new photo from draft
      const newPhoto = updatedDrafts[currentStep - 1];
      setLocalImage(newPhoto?.image || null);
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

  const handleUploadClick = () => {
    onGalleryOpen(currentStep - 1);
  };

  const handleReplaceClick = () => {
    onGalleryOpen(currentStep - 1);
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

  // Image drag handlers
  const handleImageMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingImage(true);
    setImageDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleImageMouseMove = (e: React.MouseEvent) => {
    if (isDraggingImage) {
      const dx = (e.clientX - imageDragStart.x) / zoom;
      const dy = (e.clientY - imageDragStart.y) / zoom;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setImageDragStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleImageMouseUp = () => {
    setIsDraggingImage(false);
  };

  const handleImageMouseLeave = () => {
    setIsDraggingImage(false);
  };

  const handleImageWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
  };

  const handleNext = () => {
    // Update draft with current photo
    const updatedDrafts = [...draftPhotos];
    updatedDrafts[currentStep - 1] = {
      ...updatedDrafts[currentStep - 1],
      image: localImage,
    };
    setDraftPhotos(updatedDrafts);

    if (currentStep < totalPhotos) {
      onStepChange(currentStep + 1);
    } else {
      const committed = flushCurrentStepToDraft(updatedDrafts, currentStep, { image: localImage });
      onCommitDraft(committed);
    }
  };

  const flushAndDismiss = () => {
    const flushed = flushCurrentStepToDraft(draftPhotos, currentStep, { image: localImage });
    onDismissWithDraft(flushed);
  };

  const handleSave = () => {
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
    };
    setDraftPhotos(updatedDrafts);
    
    onStepChange(step);
  };

  const isNextEnabled = localImage !== null && !currentPhoto?.hasError;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      flushAndDismiss();
    }
  };

  // Horizontal swipe/drag handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragStartX(e.clientX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && totalPhotos > 1) {
      const swipeDistance = dragStartX - e.clientX;
      
      if (swipeDistance > 50 && currentStep < totalPhotos && isNextEnabled) {
        handleNext();
      } else if (swipeDistance < -50 && currentStep > 1) {
        handleBack();
      }
    }
    setDragStartX(null);
    setIsDraggingHorizontal(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX !== null && totalPhotos > 1) {
      const horizontalDistance = Math.abs(e.clientX - dragStartX);
      if (horizontalDistance > 10) {
        setIsDraggingHorizontal(true);
      }
    }
  };

  const handleMouseLeaveArea = () => {
    setDragStartX(null);
    setIsDraggingHorizontal(false);
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

  // Handle horizontal scroll on container
  const handleContainerWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      
      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }
      
      // Accumulate deltaX
      const newDeltaX = wheelDeltaX + e.deltaX;
      setWheelDeltaX(newDeltaX);
      
      // Set timeout to detect end of scrolling
      wheelTimeoutRef.current = setTimeout(() => {
        // Threshold for navigation (e.g., 50 pixels)
        if (newDeltaX > 50 && currentStep < totalPhotos && isNextEnabled) {
          handleNext();
        } else if (newDeltaX < -50 && currentStep > 1) {
          handleBack();
        }
        setWheelDeltaX(0);
      }, 150);
    }
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
                {isEditMode ? 'Edit' : 'Upload'} {totalPhotos === 1 ? 'Photo' : 'Photos'}
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
              
              {/* Pagination - Moved to Top */}
              {totalPhotos > 1 && (
                <div className="w-full flex items-center justify-center">
                  <Stepper currentStep={currentStep} totalSteps={totalPhotos} onStepClick={handleStepClick} />
                </div>
              )}
              
              {/* Image Upload Area - Regular Photo (not SVG editor) */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full px-[24px]">
                <div 
                  className="content-stretch flex flex-col items-center relative rounded-[4px] shrink-0 w-full"
                  onTouchStart={totalPhotos > 1 ? handleTouchStart : undefined}
                  onTouchEnd={totalPhotos > 1 ? handleTouchEnd : undefined}
                  onMouseDown={totalPhotos > 1 ? handleMouseDown : undefined}
                  onMouseUp={totalPhotos > 1 ? handleMouseUp : undefined}
                  onMouseMove={totalPhotos > 1 ? handleMouseMove : undefined}
                  onMouseLeave={totalPhotos > 1 ? handleMouseLeaveArea : undefined}
                  onWheel={totalPhotos > 1 ? handleContainerWheel : undefined}
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
                        
                        {/* Error icon overlay on top left (priority over warning) */}
                        {currentPhoto?.hasError && (
                          <div className="absolute top-[16px] left-[16px] size-[32px]">
                            <PhotoErrorIcon />
                          </div>
                        )}
                        
                        {/* Warning icon overlay on top left (only if no error) */}
                        {currentPhoto?.hasWarning && !currentPhoto?.hasError && (
                          <div className="absolute top-[16px] left-[16px] size-[32px]">
                            <PhotoWarning />
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

              {/* Low-Resolution Warning Banner */}
              {currentPhoto?.hasWarning && (
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
                        {`We recommend uploading a higher-quality image.  You can continue with this one, but we aren't responsible if it appears blurry.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Banner */}
              {currentPhoto?.hasError && currentPhoto?.errorMessage && (
                <ErrorPopup message={currentPhoto.errorMessage} />
              )}

              {/* Action Buttons */}
              <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
                <button 
                  onClick={handleSave}
                  className="content-stretch flex items-center justify-center relative shrink-0"
                >
                  <div aria-hidden="true" className="absolute border-[#1e1e1e] border-b border-solid inset-0 pointer-events-none" />
                  <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                    {totalPhotos === 1 ? 'Close' : 'Save & Close'}
                  </p>
                </button>
                
                <div className="content-stretch flex gap-[24px] items-center relative shrink-0">
                  {totalPhotos > 1 && currentStep > 1 && (
                    <button 
                      onClick={handleBack}
                      className="font-semibold leading-[18px] not-italic text-[14px] text-black tracking-[0.14px] uppercase"
                    >
                      back
                    </button>
                  )}
                  
                  <button
                    onClick={handleNext}
                    disabled={!isNextEnabled}
                    className={`content-stretch flex h-[50px] items-center justify-center px-[24px] py-[12px] relative shrink-0 ${
                      isNextEnabled ? 'bg-black' : 'bg-[#aeaeae]'
                    }`}
                  >
                    <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-white tracking-[0.14px] uppercase">
                      {currentStep < totalPhotos ? 'NEXT' : 'CONFIRM'}
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