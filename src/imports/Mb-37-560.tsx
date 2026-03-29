import svgPaths from "./svg-42zp8hyryx";

function Icon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[15.012px] left-[calc(50%+0.2px)] top-[calc(50%+0.2px)] w-[16.68px]" data-name="Icon">
      <div className="absolute inset-[-5.55%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3466 16.6783">
          <g id="Icon">
            <path d={svgPaths.p34f83c00} fill="var(--fill-0, #F36641)" id="Vector" stroke="var(--stroke-0, #F36641)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
            <g id="Vector_2">
              <path d="M9.1815 5.84488V9.17822Z" fill="var(--fill-0, white)" />
              <path d="M9.1815 5.84488V9.17822" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
            </g>
            <g id="Vector_3">
              <path d="M9.1815 12.5115H9.18879Z" fill="var(--fill-0, white)" />
              <path d="M9.1815 12.5115H9.18879" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66666" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function PhotoWarning() {
  return (
    <div className="overflow-clip relative shrink-0 size-[24px]" data-name="PhotoWarning">
      <Icon />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
      <PhotoWarning />
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px]">Low-Resolution Image</p>
    </div>
  );
}

function Close() {
  return (
    <button className="block cursor-pointer relative shrink-0 size-[24px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close">
          <path d={svgPaths.p2c676700} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </g>
      </svg>
    </button>
  );
}

function Frame() {
  return (
    <div className="bg-[#f5f5f5] relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[12px] relative w-full">
          <Frame3 />
          <Close />
        </div>
      </div>
    </div>
  );
}

function Message() {
  return (
    <div className="content-stretch flex flex-col font-normal gap-[12px] items-start leading-[18px] not-italic relative shrink-0 text-[14px] text-black w-full whitespace-pre-wrap" data-name="Message">
      <p className="relative shrink-0 w-full">{`We recommend uploading a higher-quality image. `}</p>
      <p className="relative shrink-0 w-full">{`You can continue with this one, but we aren't responsible if it appears blurry.`}</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black">Replace</p>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[16px] relative w-full">
        <Message />
        <Frame2 />
      </div>
    </div>
  );
}

export default function Mb() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[8px] size-full" data-name="MB">
      <Frame />
      <Frame1 />
    </div>
  );
}