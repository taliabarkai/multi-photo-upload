import { useEffect, useState, type ReactNode } from 'react';
import ImageUploadOverlay from './ImageUploadOverlay';
import svgPaths from '../../imports/svg-cqty5kzprz';
import arrowPaths from '../../imports/svg-yaqq1s08pp';
import Icon from '../../imports/Icon-89-533';
import { useUpload } from '../contexts/UploadContext';

/** Empty slot — same layout as PhotoList DraggablePhotoItem (no image). */
export function EmptyPendantSlot({
  pendantIndex,
  totalPhotos,
  onClick,
  subtitle = 'Click to upload photo',
  primaryLine,
  hideReorderHandle,
}: {
  pendantIndex: number;
  totalPhotos: number;
  onClick: () => void;
  /** Second line under the title (e.g. multi-select hint). */
  subtitle?: string;
  /** Defaults to “Pendant n”; use e.g. “Image 1 of 3” when a Block title is shown above. */
  primaryLine?: string;
  /** When true, omits the reorder column spacer (e.g. V5 B per-block uploads). */
  hideReorderHandle?: boolean;
}) {
  const showReorderSpacer = totalPhotos > 1 && !hideReorderHandle;

  return (
    <div className="flex w-full flex-col gap-[4px]">
      <div className="group/emptySlot relative flex w-full items-center gap-[16px] rounded-[4px] p-[12px]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[4px] border border-solid border-[#E3E3E3] min-[992px]:group-hover/emptySlot:border-black transition-colors"
        />

        {showReorderSpacer && (
          <div
            className="flex size-[24px] shrink-0 items-center justify-center opacity-[0.35] pointer-events-none select-none text-[#9ca3af]"
            aria-hidden
          />
        )}

        <button
          type="button"
          onClick={onClick}
          className="relative flex min-w-0 flex-1 cursor-pointer items-center gap-[24px] text-left"
        >
          <div className="relative flex size-[72px] shrink-0 items-center justify-center rounded-[4px] border border-solid border-[#E3E3E3] bg-[#f5f5f5]">
            <div className="relative size-[32px] shrink-0">
              <div className="relative size-full overflow-clip rounded-[inherit]">
                <div className="absolute inset-[12.5%_12.49%_12.5%_12.51%]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                    <path d={svgPaths.pbc71b00} fill="black" stroke="black" strokeWidth="0.216" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-px min-w-0 flex-1 flex-col items-start gap-[4px] not-italic">
            <p
              className={`relative shrink-0 text-[14px] leading-[18px] text-black ${
                primaryLine ? 'font-normal' : 'font-semibold'
              }`}
            >
              {primaryLine ?? `Pendant ${pendantIndex + 1}`}
            </p>
            {subtitle ? (
              <p className="relative shrink-0 whitespace-pre-wrap text-[12px] font-normal leading-[16px] text-[#989898]">
                {subtitle}
              </p>
            ) : null}
          </div>
        </button>
      </div>
    </div>
  );
}

export interface UploadedPendantRowProps {
  pendantIndex: number;
  totalPhotos: number;
  imageSrc: string | null;
  slotPending: boolean;
  uploadOverlayProgress: number;
  isAnyUploading: boolean;
  onPhotoClick: () => void;
  onEdit: () => void;
  onRemove: () => void;
  /** Second line in the row (e.g. family name or color · size) — matches PhotoList personalization line */
  secondaryContent?: ReactNode;
  /** When set, replaces the default “Pendant n” label (e.g. “Image 1 of 3” for block sections). */
  primaryLabelOverride?: string;
  /** If set, only the thumbnail triggers this; label column still uses `onPhotoClick`. */
  onThumbnailClick?: () => void;
  /** When true, omits the drag/reorder icon column (e.g. V5 B per-block uploads). */
  hideReorderHandle?: boolean;
}

/**
 * Uploaded image row aligned with PhotoList (rectangular thumb, X with shadow, Edit on the right).
 * Omits drag/reorder and heart mask (IE flows use rectangular images).
 */
export function UploadedPendantRow({
  pendantIndex,
  totalPhotos,
  imageSrc,
  slotPending,
  uploadOverlayProgress,
  isAnyUploading,
  onPhotoClick,
  onEdit,
  onRemove,
  secondaryContent,
  primaryLabelOverride,
  onThumbnailClick,
  hideReorderHandle,
}: UploadedPendantRowProps) {
  const hasImage = imageSrc !== null;
  const thumbHandler = onThumbnailClick ?? onPhotoClick;
  const showReorderIcon = totalPhotos > 1 && !hideReorderHandle;
  const { uploadMode, cancelSimulatedUploadForSlot } = useUpload();
  const [showSlowNotice, setShowSlowNotice] = useState(false);
  const isSlowUploadMode = uploadMode === 'slow-upload-v7';

  useEffect(() => {
    if (!(slotPending && isSlowUploadMode)) {
      setShowSlowNotice(false);
      return;
    }
    const t = window.setTimeout(() => setShowSlowNotice(true), 9000);
    return () => window.clearTimeout(t);
  }, [slotPending, isSlowUploadMode]);

  return (
    <div className="relative w-full">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]" />

      {hasImage && (
        <button
          type="button"
          aria-label="Remove photo"
          onClick={() => {
            if (slotPending) cancelSimulatedUploadForSlot(pendantIndex);
            onRemove();
          }}
          className="absolute top-[-4px] right-[-4px] z-30 p-[4px] bg-[rgb(255,255,255)] rounded-[100px] border border-[#E3E3E3] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)] cursor-pointer"
        >
          <svg
            className={`block size-[16px] ${
              slotPending
                ? 'text-black/40 min-[992px]:hover:text-black min-[992px]:focus-visible:text-black'
                : 'text-black'
            }`}
            fill="none"
            viewBox="0 0 16 16"
          >
            <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      <div className="flex flex-row items-center size-full">
        <div className="flex flex-col gap-[4px] w-full">
          <div className="content-stretch flex gap-[16px] items-center justify-between p-[12px] relative w-full rounded-[4px] group/photoRow">
            <div
              aria-hidden="true"
              className="absolute border border-solid border-[#E3E3E3] min-[992px]:group-hover/photoRow:border-black inset-0 pointer-events-none rounded-[4px] transition-colors"
            />

            {showReorderIcon && (
              <div className="flex size-[24px] shrink-0 items-center justify-center text-black" aria-hidden>
                <Icon />
              </div>
            )}

            <div className="flex min-w-0 flex-1 items-center gap-[24px]">
              <button
                type="button"
                onClick={thumbHandler}
                className={`relative shrink-0 size-[72px] rounded-[4px] group/image border border-solid border-[#E3E3E3] overflow-hidden ${
                  slotPending ? 'pointer-events-none cursor-default' : 'cursor-pointer'
                }`}
              >
                {slotPending ? (
                  <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-[#f5f5f5]">
                    <ImageUploadOverlay progress={uploadOverlayProgress} />
                  </div>
                ) : imageSrc ? (
                  <div className="w-full h-full overflow-hidden rounded-[4px]">
                    <img
                      src={imageSrc}
                      alt={`Photo ${pendantIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                {!slotPending && imageSrc && (
                  <div className="absolute bottom-[4px] right-[4px] size-[24px] opacity-100 lg:opacity-0 lg:group-hover/image:opacity-100 transition-opacity pointer-events-none">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <rect fill="white" fillOpacity="0.4" height="24" rx="8" width="24" />
                        <path d={arrowPaths.p1674a280} fill="#1E1E1E" />
                      </g>
                    </svg>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={onPhotoClick}
                className={`flex min-w-0 flex-1 flex-col gap-[4px] items-start text-left ${
                  slotPending ? 'pointer-events-none cursor-default' : 'cursor-pointer'
                }`}
              >
                <p className="font-normal leading-[18px] text-[14px] text-black">
                  {slotPending
                    ? 'Uploading…'
                    : primaryLabelOverride ?? `Pendant ${pendantIndex + 1}`}
                </p>
                {slotPending && isSlowUploadMode && showSlowNotice && (
                  <p className="font-normal leading-[16px] text-[12px] text-[#666]">
                    This upload is taking longer than usual due to file size or connection. You can{' '}
                    <button
                      type="button"
                      className="pointer-events-auto inline align-baseline font-normal text-[12px] leading-[16px] text-[#666] underline decoration-solid cursor-pointer p-0 m-0 bg-transparent border-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelSimulatedUploadForSlot(pendantIndex);
                        onRemove();
                      }}
                    >
                      cancel upload
                    </button>{' '}
                    or wait.
                  </p>
                )}
                {!slotPending && secondaryContent}
              </button>
            </div>

            <button
              type="button"
              disabled={slotPending}
              onClick={onEdit}
              className={`font-semibold leading-[18px] text-[14px] pr-[8px] underline decoration-solid text-black shrink-0 ${
                slotPending ? 'cursor-not-allowed opacity-40' : 'cursor-pointer'
              }`}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
