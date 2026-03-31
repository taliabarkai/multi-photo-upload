import React from 'react';
import PhotoErrorIcon from './PhotoErrorIcon';

interface ErrorPopupProps {
  message: string;
}

export default function ErrorPopup({ message }: ErrorPopupProps) {
  return (
    <div className="bg-[#f5f5f5] w-full p-[12px] rounded-[4px]">
      <div className="flex gap-[12px] items-start w-full min-w-0">
        <div className="shrink-0 size-[24px]">
          <PhotoErrorIcon />
        </div>

        <div className="min-w-0 flex-1 flex flex-col gap-[4px]">
          <p className="font-semibold leading-[18px] text-[14px] text-[#c41314]">
            Low-Resolution Image
          </p>
          <p className="font-normal text-[14px] leading-[18px] text-[#c41314] break-words whitespace-normal">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
