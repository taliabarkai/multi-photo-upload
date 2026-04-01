interface V7SlowUploadNoticeProps {
  /** Number of pendants / photo slots in the flow (1 → singular copy, 2+ → plural). */
  totalPhotos: number;
  onCancelUploads: () => void;
}

/** Figma: 24×24 info mark, secondary #F04012 (THEMES / node 9370:27445). */
function V7SlowUploadInfoIcon() {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" fill="none" aria-hidden className="shrink-0">
      <circle cx="12" cy="12" r="9.25" stroke="#F04012" strokeWidth="1.5" />
      <circle cx="12" cy="8" r="1.125" fill="#F04012" />
      <path d="M12 11.25V17" stroke="#F04012" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * V7 slow-upload banner — single placement below the photo list (Figma: light grey card, info icon, body text).
 */
export default function V7SlowUploadNotice({ totalPhotos, onCancelUploads }: V7SlowUploadNoticeProps) {
  const plural = totalPhotos >= 2;
  const lead = plural
    ? 'These uploads taking longer than usual due to file size or connection.'
    : 'This upload is taking longer than usual due to file size or connection.';
  const cancelLabel = plural ? 'cancel uploads' : 'cancel upload';

  return (
    <div
      className="w-full rounded-[4px] bg-[#f5f5f5] p-[12px]"
      role="status"
      aria-live="polite"
    >
      <div className="flex w-full items-start gap-[12px]">
        <div className="relative flex size-[24px] shrink-0 items-center justify-center overflow-clip">
          <V7SlowUploadInfoIcon />
        </div>
        <p className="min-w-0 flex-1 font-normal text-[14px] leading-[18px] text-black">
          {lead} You can{' '}
          <button
            type="button"
            className="inline p-0 font-normal text-[14px] leading-[18px] text-black underline decoration-solid [text-decoration-skip-ink:none]"
            onClick={onCancelUploads}
          >
            {cancelLabel}
          </button>{' '}
          or wait.
        </p>
      </div>
    </div>
  );
}
