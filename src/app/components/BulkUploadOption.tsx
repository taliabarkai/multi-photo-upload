import svgPaths from '../../imports/svg-cqty5kzprz';
import ValidationErrorIcon from './ValidationErrorIcon';

interface BulkUploadOptionProps {
  onUploadClick: () => void;
  onBulkUploadClick?: () => void;
  totalPhotos: number;
  uploadedCount: number;
  uploadMode?:
    | 'personalization-bulk'
    | 'personalization-bulk-regular'
    | 'v5a-bulk-multi'
    | 'photo-only'
    | 'image-only';
  name?: string;
  onNameChange?: (value: string) => void;
  validationError?: { image?: string; name?: string; combined?: string };
  allValidationErrors?: { [key: number]: { image?: string; name?: string; combined?: string } };
}

export default function BulkUploadOption({ onUploadClick, onBulkUploadClick, totalPhotos, uploadedCount, uploadMode, name = '', onNameChange, validationError, allValidationErrors }: BulkUploadOptionProps) {
  const isPersonalizationMode =
    uploadMode === 'personalization-bulk' ||
    uploadMode === 'personalization-bulk-regular' ||
    uploadMode === 'v5a-bulk-multi';
  const isPhotoOnlyMode = uploadMode === 'photo-only' || uploadMode === 'image-only';
  
  const charCount = name.length;
  
  // Check if there's an image error (V3 / V4: image with editor & skip editor)
  const hasImageError = isPhotoOnlyMode && allValidationErrors && Object.keys(allValidationErrors).filter(k => Number(k) >= 0).length > 0;
  
  // Check if there's a consolidated error (V1/V2 when all items are empty)
  const hasConsolidatedError = isPersonalizationMode && validationError?.combined;
  
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full">
      {/* Header with upload count */}
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center not-italic relative w-full text-[14px]">
        <p className="font-medium leading-[18px] text-black">
          {isPhotoOnlyMode ? 'Upload your photos' : 'Personalize your pendants'} <span className="font-normal text-[#666]">({uploadedCount} of {totalPhotos})</span>:
        </p>
      </div>

      {/* Main upload button */}
      <div className="flex flex-col gap-[8px] w-full">
        <button
          onClick={onUploadClick}
          className="content-stretch flex gap-[16px] items-center p-[9px] relative rounded-[4px] w-full group cursor-pointer"
        >
          <div 
            aria-hidden="true" 
            className="absolute border border-[#E3E3E3] min-[992px]:group-hover:border-black border-solid inset-0 pointer-events-none rounded-[4px] transition-colors"
          />
          
          <div
            className="bg-[#f5f5f5] content-stretch flex items-center justify-center relative rounded-[3.6px] shrink-0 size-[72px] border border-solid border-[#E3E3E3]"
          >
            <div className="relative shrink-0 size-[32px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                <div className="absolute inset-[12.5%_12.49%_12.5%_12.51%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d={svgPaths.pbc71b00} fill="black" stroke="black" strokeWidth="0.216" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="content-stretch flex flex-col gap-[4px] items-start not-italic relative">
            <p className="font-semibold leading-[18px] text-[14px] text-black">
              {totalPhotos === 1 ? 'Select your photo' : 'Select your photos'}
            </p>
            <p className="font-normal leading-[16px] text-[#666] text-[12px] text-left">
              {isPersonalizationMode
                ? (totalPhotos === 1 
                    ? 'Choose an image and add a name'
                    : `Choose ${totalPhotos} images and add a name for each`
                  )
                : (totalPhotos === 1 
                    ? 'Choose an image from your device'
                    : `Choose ${totalPhotos} images from your device`
                  )
              }
            </p>
          </div>
        </button>

        {/* Consolidated error for V1/V2 when all items are empty */}
        {hasConsolidatedError && (
          <div className="flex items-center gap-[4px]">
            <ValidationErrorIcon />
            <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
              {validationError.combined}
            </p>
          </div>
        )}

        {/* Image validation error - below upload button (V3/V4) */}
        {hasImageError && (
          <div className="flex items-center gap-[4px]">
            <ValidationErrorIcon />
            <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
              {totalPhotos === 1 ? 'Please upload an image' : 'Please upload all images'}
            </p>
          </div>
        )}
      </div>

      {/* Family name (V3 / V4 — image with editor & skip editor) */}
      {isPhotoOnlyMode && (
        <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full px-[0px] pt-[12px] pb-[0px]">
          <div className="content-stretch flex items-center relative shrink-0 w-full">
            <p className="font-medium leading-[18px] not-italic text-[14px]">Family Name:</p>
          </div>
          <div className="flex flex-col gap-[8px] w-full">
            <div className="h-[48px] relative rounded-[4px] shrink-0 w-full group/input">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex font-normal items-center justify-between not-italic px-[12px] relative size-full text-black border border-[#E3E3E3] rounded-[4px]">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => onNameChange?.(e.target.value)}
                    placeholder="e.g. John"
                    maxLength={12}
                    className="flex-1 leading-[18px] text-[16px] outline-none bg-transparent placeholder:text-[#989898]"
                    onClick={(e) => e.stopPropagation()}
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
            </div>
            
            {/* Name validation error - below name input */}
            {validationError?.name && (
              <div className="flex items-center gap-[4px]">
                <ValidationErrorIcon />
                <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">
                  Please enter a name
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}