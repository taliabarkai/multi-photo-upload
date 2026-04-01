import React from 'react';

interface ImageUploadOverlayProps {
  /** Progress 0–1 for the active uploading slot. Ignored when `indeterminate` is true. */
  progress: number;
  /** Continuous spinner for slots waiting in the upload queue (not the active slot). */
  indeterminate?: boolean;
  /** V7 (slow upload): show `%` in the center of the ring — demo / alternate example. */
  showProgressPercent?: boolean;
}

const SIZE_DEFAULT = 24;
const SIZE_PERCENT = 44;
const STROKE = 2;

/** Circular upload indicator — smooth determinate ring or continuous indeterminate spin. */
export default function ImageUploadOverlay({
  progress,
  indeterminate = false,
  showProgressPercent = false,
}: ImageUploadOverlayProps) {
  const size = showProgressPercent && !indeterminate ? SIZE_PERCENT : SIZE_DEFAULT;
  const R = (size - STROKE) / 2;
  const C = 2 * Math.PI * R;
  const t = Math.min(1, Math.max(0, progress));
  const offset = C * (1 - t);
  const pct = Math.round(t * 100);

  const trackCircle = (
    <circle
      cx={size / 2}
      cy={size / 2}
      r={R}
      fill="none"
      stroke="rgba(255,255,255,0.28)"
      strokeWidth={STROKE}
    />
  );

  const ariaPct = showProgressPercent && !indeterminate ? `Uploading ${pct}%` : 'Uploading';

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-black/30"
      role="status"
      aria-live="polite"
      aria-label={ariaPct}
    >
      {indeterminate ? (
        <div
          className="relative flex items-center justify-center motion-reduce:animate-none animate-[spin_0.85s_linear_infinite]"
          style={{ width: size, height: size }}
        >
          <svg width={size} height={size} className="-rotate-90 block" aria-hidden>
            {trackCircle}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={R}
              fill="none"
              stroke="white"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={`${C * 0.32} ${C}`}
            />
          </svg>
        </div>
      ) : (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90 block shrink-0" aria-hidden>
            {trackCircle}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={R}
              fill="none"
              stroke="white"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
            />
          </svg>
          {showProgressPercent ? (
            <span
              className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums leading-none text-white"
              aria-hidden
            >
              {pct}%
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
}
