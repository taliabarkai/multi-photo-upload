import svgPaths from "./svg-hsxn668bxv";

function Frame5() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame 1224">
          <path clipRule="evenodd" d={svgPaths.pbfb9ef0} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black uppercase">the story behind it</p>
      <Frame5 />
    </div>
  );
}

function MoreInfo() {
  return (
    <div className="relative shrink-0 w-full" data-name="more info">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <Frame />
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame 1224">
          <path clipRule="evenodd" d={svgPaths.pbfb9ef0} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black uppercase">instructions</p>
      <Frame6 />
    </div>
  );
}

function MoreInfo1() {
  return (
    <div className="relative shrink-0 w-full" data-name="more info">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <Frame1 />
      </div>
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame 1224">
          <path clipRule="evenodd" d={svgPaths.pbfb9ef0} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black uppercase">details</p>
      <Frame7 />
    </div>
  );
}

function MoreInfo2() {
  return (
    <div className="relative shrink-0 w-full" data-name="more info">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <Frame2 />
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="relative shrink-0 size-[20px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Frame 1224">
          <path clipRule="evenodd" d={svgPaths.pbfb9ef0} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black uppercase">shipping</p>
      <Frame8 />
    </div>
  );
}

function MoreInfo3() {
  return (
    <div className="relative shrink-0 w-full" data-name="more info">
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <Frame3 />
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="bg-[#f2eeeb] content-stretch flex flex-col items-center py-[8px] relative size-full">
      <MoreInfo />
      <MoreInfo1 />
      <MoreInfo2 />
      <MoreInfo3 />
    </div>
  );
}