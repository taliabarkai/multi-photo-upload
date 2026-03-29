import React from 'react';
import PhotoErrorIcon from './PhotoErrorIcon';

interface ErrorPopupProps {
  message: string;
}

export default function ErrorPopup({ message }: ErrorPopupProps) {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[4px] shrink-0 w-full">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center p-[8px] relative w-full">
          <div className="content-stretch flex flex-col items-start justify-center relative shrink-0">
            <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
              <div className="shrink-0 size-[24px]">
                <PhotoErrorIcon />
              </div>
              <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#c41314] text-[12px]">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
