import React from 'react';

interface ImageUploadOverlayProps {
  /** Progress 0–1 for the active uploading slot. Ignored when `indeterminate` is true. */
  progress: number;
  /** Continuous spinner for slots waiting in the upload queue (not the active slot). */
  indeterminate?: boolean;
}

const SIZE = 24;
const STROKE = 2;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

/** Circular upload indicator — smooth determinate ring or continuous indeterminate spin. */
export default function ImageUploadOverlay({ progress, indeterminate = false }: ImageUploadOverlayProps) {
  const t = Math.min(1, Math.max(0, progress));
  const offset = C * (1 - t);

  const trackCircle = (
    <circle
      cx={SIZE / 2}
      cy={SIZE / 2}
      r={R}
      fill="none"
      stroke="rgba(255,255,255,0.28)"
      strokeWidth={STROKE}
    />
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-black/30"
      role="status"
      aria-live="polite"
      aria-label="Uploading"
    >
      {indeterminate ? (
        <div
          className="relative flex items-center justify-center motion-reduce:animate-none animate-[spin_0.85s_linear_infinite]"
          style={{ width: SIZE, height: SIZE }}
        >
          <svg width={SIZE} height={SIZE} className="-rotate-90 block" aria-hidden>
            {trackCircle}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
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
        <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
          <svg width={SIZE} height={SIZE} className="-rotate-90 block" aria-hidden>
            {trackCircle}
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={R}
              fill="none"
              stroke="white"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
            />
          </svg>
        </div>
      )}
    </div>
  );
}
