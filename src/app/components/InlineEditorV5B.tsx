import { useUpload, type PhotoData } from '../contexts/UploadContext';
import ValidationErrorIcon from './ValidationErrorIcon';
import { EmptyPendantSlot, UploadedPendantRow } from './UploadedPendantRow';
import { COLOR_SWATCHES } from '../constants/multiPersonalization';

interface InlineEditorV5BProps {
  onOpenGallery: () => void;
  /** Opens the stepper modal for this pendant (same as V3 Edit / image tap). */
  onEditPendant: (index: number) => void;
  onDeleteBlockImage: (index: number) => void;
  validationErrors?: { [key: number]: { image?: string; name?: string; combined?: string } };
}

function V5PersonalizationFields({
  index,
  photo,
  onPatch,
}: {
  index: number;
  photo: PhotoData | undefined;
  onPatch: (patch: Partial<PhotoData>) => void;
}) {
  const title = photo?.photoTitle ?? '';
  const colorId = photo?.colorSwatchId ?? '1';
  const frameSize = photo?.frameSizeXL ?? 'M';

  return (
    <div className="flex w-full flex-col gap-[16px]">
      <div className="flex w-full flex-col gap-[8px]">
        <label
          className="w-full text-[14px] font-normal leading-[18px] text-black"
          htmlFor={`v5b-title-${index}`}
        >
          Title
        </label>
        <div className="group/input relative h-[48px] w-full shrink-0 rounded-[4px]">
          <div className="flex h-full w-full flex-row items-center overflow-clip rounded-[inherit]">
            <div className="content-stretch flex w-full items-center bg-white px-[12px] text-black">
              <input
                id={`v5b-title-${index}`}
                type="text"
                value={title}
                onChange={(e) => onPatch({ photoTitle: e.target.value.slice(0, 80) })}
                placeholder="e.g. Our Wedding Song"
                maxLength={80}
                className="flex-1 bg-transparent text-[16px] leading-[18px] outline-none placeholder:text-[#989898]"
              />
            </div>
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[4px] border border-solid border-[#E3E3E3] transition-colors group-focus-within/input:border-black group-hover/input:border-black"
          />
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <p className="text-[14px] font-normal leading-[18px] text-black">
          Color – {COLOR_SWATCHES.find((s) => s.id === colorId)?.label ?? '—'}
        </p>
        <div className="flex flex-wrap gap-[12px]" role="radiogroup" aria-label="Frame color">
          {COLOR_SWATCHES.map((sw) => (
            <button
              key={sw.id}
              type="button"
              role="radio"
              aria-checked={colorId === sw.id}
              aria-label={sw.label}
              onClick={() => onPatch({ colorSwatchId: sw.id })}
              className={`relative size-[40px] shrink-0 rounded-full border-2 transition-colors ${
                colorId === sw.id ? 'border-black ring-2 ring-black/20 ring-offset-2' : 'border-white shadow-sm'
              } ${sw.className}`}
            />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-[8px]">
        <p className="text-[14px] font-normal leading-[18px] text-black">Frame size</p>
        <div className="flex flex-wrap gap-[8px]">
          {(['S', 'M', 'L', 'XL'] as const).map((fs) => (
            <button
              key={fs}
              type="button"
              onClick={() => onPatch({ frameSizeXL: fs })}
              className={`min-w-[44px] rounded-[4px] border border-solid px-[14px] py-[8px] text-[14px] font-medium transition-colors ${
                frameSize === fs
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
  );
}

export default function InlineEditorV5B({
  onOpenGallery,
  onEditPendant,
  onDeleteBlockImage,
  validationErrors,
}: InlineEditorV5BProps) {
  const {
    photos,
    totalPhotos,
    updatePhoto,
    activeUploadProgress,
    isSlotPendingSimulatedUpload,
    activeUploadSlot,
    isAnyUploading,
  } = useUpload();

  const bagError = validationErrors?.[-1]?.combined;

  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full max-w-[520px]">
      {Array.from({ length: totalPhotos }, (_, index) => {
        const photo = photos[index];
        const err = validationErrors?.[index];
        const slotPendingThumb = photo?.image != null && isSlotPendingSimulatedUpload(index);
        const showProgressOnThumb = slotPendingThumb && activeUploadSlot === index;

        return (
          <div
            key={index}
            className={`w-full flex flex-col gap-[16px] ${index === 0 ? '' : 'border-t border-[#E3E3E3] pt-[24px]'}`}
          >
            <p className="font-semibold leading-[18px] text-[14px] text-black">Image {index + 1}</p>

            <div className="w-full flex flex-col gap-[8px]">
              {photo?.image || showProgressOnThumb ? (
                <>
                  <UploadedPendantRow
                    pendantIndex={index}
                    totalPhotos={totalPhotos}
                    imageSrc={photo?.image ?? null}
                    slotPending={showProgressOnThumb}
                    uploadOverlayProgress={activeUploadProgress}
                    isAnyUploading={isAnyUploading}
                    onPhotoClick={() => onEditPendant(index)}
                    onThumbnailClick={() => onEditPendant(index)}
                    onEdit={() => onEditPendant(index)}
                    onRemove={() => onDeleteBlockImage(index)}
                    primaryLabelOverride={`Image ${index + 1}`}
                    hideReorderHandle
                  />
                </>
              ) : (
                <EmptyPendantSlot
                  pendantIndex={index}
                  totalPhotos={totalPhotos}
                  onClick={onOpenGallery}
                  primaryLine={`Image ${index + 1}`}
                  subtitle=""
                  hideReorderHandle
                />
              )}
            </div>

            <V5PersonalizationFields
              index={index}
              photo={photo}
              onPatch={(patch) => updatePhoto(index, patch)}
            />

            {err?.image && (
              <div className="flex items-center gap-[4px]">
                <ValidationErrorIcon />
                <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">{err.image}</p>
              </div>
            )}
            {err?.combined && (
              <div className="flex items-center gap-[4px]">
                <ValidationErrorIcon />
                <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">{err.combined}</p>
              </div>
            )}
          </div>
        );
      })}

      {bagError && (
        <div className="flex items-center gap-[4px] w-full">
          <ValidationErrorIcon />
          <p className="font-normal leading-[16px] text-[12px] text-[#c41314]">{bagError}</p>
        </div>
      )}
    </div>
  );
}
