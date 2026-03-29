import React from 'react';
import svgPaths from '../../imports/svg-42zp8hyryx';

interface WarningPopupProps {
  onClose: () => void;
  onReplace?: () => void;
  /** Shown in body copy, e.g. "Pendant 1" */
  pendantLabel?: string;
}

export default function WarningPopup({
  onClose,
  onReplace,
  pendantLabel = 'Pendant 1',
}: WarningPopupProps) {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] size-full">
      {/* Header */}
      <div className="bg-[#f5f5f5] relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between p-[12px] relative w-full">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
              <div className="overflow-clip relative shrink-0 size-[24px]">
                <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.012px] left-[calc(50%+0.2px)] top-[calc(50%+0.2px)] w-[16.68px]">
                  <div className="absolute inset-[-5.55%_-5%]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3466 16.6783">
                      <g>
                        <path d={svgPaths.p34f83c00} fill="#F36641" stroke="#F36641" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
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
              <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">
                Low-Resolution Image
              </p>
            </div>
            <button onClick={onClose} className="block cursor-pointer relative shrink-0 size-[24px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                <g>
                  <path d={svgPaths.p2c676700} fill="#1E1E1E" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
          <div className="content-stretch flex flex-col font-normal gap-[12px] items-start leading-[18px] not-italic relative shrink-0 text-[14px] text-black w-full whitespace-pre-wrap">
            <p className="relative shrink-0 w-full">
              The image for <span className="font-semibold">{pendantLabel}</span> is lower resolution than we recommend.
              We suggest uploading a higher-quality photo for this pendant.
            </p>
            <p className="relative shrink-0 w-full">
              You can continue with this image, but we aren&apos;t responsible if it appears blurry.
            </p>
          </div>
          <button 
            onClick={() => {
              onClose();
              if (onReplace) onReplace();
            }}
            className="content-stretch flex items-center justify-center relative shrink-0 cursor-pointer"
          >
            <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
            <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black">Replace</p>
          </button>
        </div>
      </div>
    </div>
  );
}
