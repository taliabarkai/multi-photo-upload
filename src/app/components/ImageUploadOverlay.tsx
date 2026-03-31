import React from 'react';

interface ImageUploadOverlayProps {
  /** Stepped progress 0–1 (e.g. 24% increments from context). */
  progress: number;
}

const SIZE = 24;
const STROKE = 2;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

/** Circular progress ring (no percentage text). */
export default function ImageUploadOverlay({ progress }: ImageUploadOverlayProps) {
  const offset = C * (1 - progress);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-black/30"
      role="status"
      aria-live="polite"
      aria-label="Uploading"
    >
      <div className="relative flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="rgba(255,255,255,0.28)"
            strokeWidth={STROKE}
          />
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
            className="transition-[stroke-dashoffset] duration-300 ease-out"
          />
        </svg>
      </div>
    </div>
  );
}
