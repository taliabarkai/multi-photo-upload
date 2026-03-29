import React from 'react';

interface ImageUploadOverlayProps {
  /** Stepped progress 0–1 (e.g. 24% increments from context). */
  progress: number;
}

const SIZE = 52;
const STROKE = 3;
const R = (SIZE - STROKE) / 2;
const C = 2 * Math.PI * R;

/** Circular progress ring with percentage only; row label “Uploading…” stays outside (PhotoList / IE). */
export default function ImageUploadOverlay({ progress }: ImageUploadOverlayProps) {
  const pct = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const offset = C * (1 - progress);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-black/30"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-label={`Upload ${pct} percent`}
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
        <span className="absolute text-[13px] font-semibold tabular-nums leading-none text-white">
          {pct}%
        </span>
      </div>
    </div>
  );
}
