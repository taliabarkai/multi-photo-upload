import React, { useState, useEffect } from 'react';
import { useUpload } from '../contexts/UploadContext';
import Arrow from '../../imports/Arrow';
import svgPaths from '../../imports/svg-bkftxep4pk';
import iconSvgPaths from '../../imports/svg-8jp3g9yxdw';
import replaceSvgPaths from '../../imports/svg-rrmye4l25l';
import photoSvgPaths from '../../imports/svg-nbd0r6fnhd';
import PhotoWarning from '../../imports/PhotoWarning';
import Stepper from '../components/Stepper';
import type { PhotoData } from '../contexts/UploadContext';
import { mergePendingImagesIntoDraft, flushCurrentStepToDraft } from '../utils/modalDraft';
import ErrorPopup from '../components/ErrorPopup';
import PhotoErrorIcon from '../components/PhotoErrorIcon';

interface SvgPhotoOnlyModalProps {
  step: number;
  onDismissWithDraft: (draft: PhotoData[]) => void;
  onCommitDraft: (draft: PhotoData[]) => void;
  onStepChange: (step: number) => void;
  onGalleryOpen: (stepIndex: number) => void;
  pendingImage: string | null;
  setPendingImage: (image: string | null) => void;
  isEditMode?: boolean;
  pendingDraftImages?: string[];
  persistedDraft?: PhotoData[] | null;
}

export default function SvgPhotoOnlyModal({
  step,
  onDismissWithDraft,
  onCommitDraft,
  onStepChange,
  onGalleryOpen,
  pendingImage,
  setPendingImage,
  isEditMode = false,
  pendingDraftImages = [],
  persistedDraft = null,
}: SvgPhotoOnlyModalProps) {
  const { photos, totalPhotos } = useUpload();
  
  const currentStep = step;
  
  // Initialize draft state from current photos - sync with actual photos
  const [draftPhotos, setDraftPhotos] = useState<typeof photos>([]);

  useEffect(() => {
    const base = photos.map((photo) => ({ ...photo }));
    let initial: PhotoData[];
    if (isEditMode) {
      initial = base;
    } else if (pendingDraftImages.length > 0) {
      initial = mergePendingImagesIntoDraft(base, pendingDraftImages, isEditMode);
    } else if (persistedDraft && persistedDraft.length > 0) {
      initial = persistedDraft.map((p) => ({ ...p }));
    } else {
      initial = base;
    }
    setDraftPhotos(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const currentPhoto = draftPhotos[currentStep - 1];
  
  const [localImage, setLocalImage] = useState<string | null>(currentPhoto?.image || null);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [wheelDeltaX, setWheelDeltaX] = useState(0);
  const wheelTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize on mount - load the correct photo for the current step
  useEffect(() => {
    if (!isInitialized) {
      const photoForStep = draftPhotos[currentStep - 1];
      setLocalImage(photoForStep?.image || null);
      setIsInitialized(true);
    }
  }, [isInitialized, draftPhotos, currentStep]);

  // Update local image when pending image changes
  useEffect(() => {
    if (pendingImage) {
      setLocalImage(pendingImage);
      setDraftPhotos((prev) => {
        const next = [...prev];
        const idx = currentStep - 1;
        if (idx >= 0 && idx < next.length) {
          next[idx] = {
            ...next[idx],
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

  // When parent changes `step`, just load that step's draft (draft is flushed by navigation handlers).
  useEffect(() => {
    if (!isInitialized) return;
    const newPhoto = draftPhotos[currentStep - 1];
    setLocalImage(newPhoto?.image || null);
    setZoom(1);
    setRotation(0);
    setPosition({ x: 0, y: 0 });
  }, [currentStep, draftPhotos, isInitialized]);

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

  const handleNext = () => {
    if (currentStep < totalPhotos) {
      setDraftPhotos((prev) =>
        flushCurrentStepToDraft(prev, currentStep, {
          image: localImage,
        })
      );
      onStepChange(currentStep + 1);
    } else {
      const committed = flushCurrentStepToDraft(draftPhotos, currentStep, { image: localImage });
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
      setDraftPhotos((prev) =>
        flushCurrentStepToDraft(prev, currentStep, {
          image: localImage,
        })
      );
      onStepChange(currentStep - 1);
    } else {
      flushAndDismiss();
    }
  };

  const handleStepClick = (step: number) => {
    // Save current draft before switching
    setDraftPhotos((prev) =>
      flushCurrentStepToDraft(prev, currentStep, {
        image: localImage,
      })
    );
    
    onStepChange(step);
  };

  const isNextEnabled = localImage !== null && !currentPhoto?.hasError;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      flushAndDismiss();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<SVGImageElement>) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (isDragging) {
      const dx = e.clientX - dragStart.x;
      const dy = e.clientY - dragStart.y;
      setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      setDragStart({ x: e.clientX, y: e.clientY });
      if (dragStartX !== null) {
        const horizontalDistance = Math.abs(e.clientX - dragStartX);
        const verticalDistance = Math.abs(e.clientY - dragStart.y);
        if (horizontalDistance > verticalDistance) {
          setIsDraggingHorizontal(true);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsDraggingHorizontal(false);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    // Track touch end for swipe detection
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
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

  // Load the current step's photo data whenever draftPhotos or currentStep changes
  useEffect(() => {
    if (draftPhotos.length > 0 && currentPhoto) {
      setLocalImage(currentPhoto.image || null);
    }
  }, [draftPhotos, currentStep]);

  const showSaveAndClose = totalPhotos > 1 && currentStep < totalPhotos;

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
        <div className="bg-white relative flex-1 min-h-0 w-full overflow-y-auto">
          <div className="overflow-clip rounded-[inherit] size-full">
            <div className="content-stretch flex flex-col gap-[16px] items-start pb-[16px] p-[16px] relative w-full">
              
              {/* Pagination - At Top */}
              {totalPhotos > 1 && (
                <div className="w-full flex items-center justify-center">
                  <Stepper currentStep={currentStep} totalSteps={totalPhotos} onStepClick={handleStepClick} />
                </div>
              )}

              {totalPhotos > 1 && (
                <p className="w-full text-center text-[14px] font-normal leading-[18px] text-black">
                  Pendant {currentStep} of {totalPhotos}
                </p>
              )}
              
              {/* SVG Masked Image Upload Area */}
              <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                <div 
                  className="content-stretch flex flex-col items-center relative rounded-[4px] shrink-0 w-full"
                  onWheel={totalPhotos > 1 ? handleContainerWheel : undefined}
                >
                  {localImage ? (
                    <>
                      {/* SVG Masked Image Container */}
                      <div className="relative w-full aspect-square overflow-hidden rounded-[4px] border border-[#E3E3E3] border-solid">
                        <svg 
                          className="absolute inset-0 w-full h-full" 
                          viewBox="0 0 300 300" 
                          preserveAspectRatio="xMidYMid meet"
                          onMouseMove={handleMouseMove}
                          onMouseUp={handleMouseUp}
                          onMouseLeave={handleMouseUp}
                          onTouchStart={handleTouchStart}
                          onTouchMove={handleTouchMove}
                          onTouchEnd={handleTouchEnd}
                        >
                          <defs>
                            {/* Heart-shaped pendant mask with better proportions - shifted up 16px */}
                            <clipPath id="pendant-mask">
                              <path d="M150,249 C150,249 45,159 45,94 C45,54 70,29 100,29 C120,29 135,39 150,59 C165,39 180,29 200,29 C230,29 255,54 255,94 C255,159 150,249 150,249 Z" />
                            </clipPath>
                            
                            {/* Gold gradient for heart outline */}
                            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                              <stop offset="50%" style={{ stopColor: '#F4D03F', stopOpacity: 1 }} />
                              <stop offset="100%" style={{ stopColor: '#C4A030', stopOpacity: 1 }} />
                            </linearGradient>
                          </defs>
                          
                          {/* Low-opacity background image - shows full frame */}
                          <image
                            href={localImage}
                            x="0"
                            y="0"
                            width="300"
                            height="300"
                            preserveAspectRatio="xMidYMid slice"
                            opacity="0.2"
                            style={{
                              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                              transformOrigin: 'center',
                              pointerEvents: 'none',
                            }}
                          />
                          
                          {/* Draggable image with clip path - full opacity inside heart */}
                          <g clipPath="url(#pendant-mask)">
                            <image
                              href={localImage}
                              x="0"
                              y="0"
                              width="300"
                              height="300"
                              preserveAspectRatio="xMidYMid slice"
                              style={{
                                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom}) rotate(${rotation}deg)`,
                                transformOrigin: 'center',
                                cursor: isDragging ? 'grabbing' : 'grab',
                              }}
                              onMouseDown={handleMouseDown}
                            />
                          </g>
                          
                          {/* Gold heart outline/border - thinner stroke */}
                          <path
                            d="M150,249 C150,249 45,159 45,94 C45,54 70,29 100,29 C120,29 135,39 150,59 C165,39 180,29 200,29 C230,29 255,54 255,94 C255,159 150,249 150,249 Z"
                            fill="none"
                            stroke="url(#goldGradient)"
                            strokeWidth="8"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            pointerEvents="none"
                          />
                        </svg>
                        
                        {/* Error icon overlay on top left (priority over warning) */}
                        {currentPhoto?.hasError && (
                          <div className="absolute top-[16px] left-[16px] size-[32px]">
                            <div className="relative size-full scale-[1.33] origin-center">
                              <PhotoErrorIcon />
                            </div>
                          </div>
                        )}

                        {/* Warning icon overlay on top left (only if no error) */}
                        {currentPhoto?.hasWarning && !currentPhoto?.hasError && (
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
                      <div className="relative w-full aspect-square">
                        <div aria-hidden="true" className="absolute border border-[#E3E3E3] border-solid inset-0 pointer-events-none rounded-[4px]" />
                        
                        <button 
                          onClick={handleUploadClick}
                          className="absolute inset-0 content-stretch flex items-center justify-center cursor-pointer"
                        >
                          {/* SVG with heart shape and centered content */}
                          <svg 
                            className="w-full h-full" 
                            viewBox="0 0 300 300" 
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <defs>
                              {/* Gold gradient for heart outline */}
                              <linearGradient id="goldGradientEmpty" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#D4AF37', stopOpacity: 1 }} />
                                <stop offset="50%" style={{ stopColor: '#F4D03F', stopOpacity: 1 }} />
                                <stop offset="100%" style={{ stopColor: '#C4A030', stopOpacity: 1 }} />
                              </linearGradient>
                            </defs>
                            
                            {/* Gold heart outline */}
                            <path
                              d="M150,249 C150,249 45,159 45,94 C45,54 70,29 100,29 C120,29 135,39 150,59 C165,39 180,29 200,29 C230,29 255,54 255,94 C255,159 150,249 150,249 Z"
                              fill="none"
                              stroke="url(#goldGradientEmpty)"
                              strokeWidth="8"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                            />
                            
                            {/* Camera icon - centered in the heart */}
                            <g transform="translate(150, 118)">
                              <g transform="translate(-15, -15)">
                                <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                                  <path clipRule="evenodd" d={photoSvgPaths.p5d7e400} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.p1a1a7140} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.p1a9d1000} fill="black" fillRule="evenodd" />
                                  <path clipRule="evenodd" d={photoSvgPaths.pe052b40} fill="black" fillRule="evenodd" />
                                </svg>
                              </g>
                            </g>
                            
                            {/* "Upload image" text - below the icon */}
                            <text
                              x="150"
                              y="155"
                              textAnchor="middle"
                              className="font-normal text-[12px] fill-black"
                              style={{ fontSize: '12px' }}
                            >
                              Upload image
                            </text>
                          </svg>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Low-Resolution Warning Banner (only if no error) */}
              {currentPhoto?.hasWarning && !currentPhoto?.hasError && (
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

              {/* Error Banner (blocking) */}
              {currentPhoto?.hasError && currentPhoto?.errorMessage && (
                <ErrorPopup message={currentPhoto.errorMessage} />
              )}

              {/* Action Buttons — Save & Close hidden for single image and on final confirm step */}
              <div
                className={`content-stretch flex items-center relative shrink-0 w-full ${
                  showSaveAndClose ? 'justify-between' : 'justify-end'
                }`}
              >
                {showSaveAndClose && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className="content-stretch flex items-center justify-center relative shrink-0"
                  >
                    <div aria-hidden="true" className="absolute border-[#1e1e1e] border-b border-solid inset-0 pointer-events-none" />
                    <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                      Save & Close
                    </p>
                  </button>
                )}

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
                    className={`content-stretch flex h-[50px] items-center justify-center px-[24px] py-[12px] relative shrink-0 min-w-[112px] ${
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