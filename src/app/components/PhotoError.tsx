import React from 'react';
import svgPaths from '../../imports/svg-qx303ww8pd';

interface PhotoErrorProps {
  message: string;
}

export default function PhotoError({ message }: PhotoErrorProps) {
  return (
    <div className="inline-flex gap-[4px] items-center text-left">
      <p className="font-normal leading-[18px] text-[14px] text-[#c41314]">
        {message}
      </p>
    </div>
  );
}