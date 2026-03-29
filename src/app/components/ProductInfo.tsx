import svgPaths from "../../imports/svg-8vdd84l1h8";
import newStarPaths from "../../imports/svg-y6oy8cgdfl";

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <path clipRule="evenodd" d={svgPaths.p9945e80} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Breadcrumbs">
      <p className="font-normal leading-[16px] relative shrink-0 text-[#1f1f1f] text-[12px] tracking-[0.24px]">Home</p>
      <Chevron />
      <p className="font-normal leading-[16px] relative shrink-0 text-[#1f1f1f] text-[12px] tracking-[0.24px]">Category</p>
    </div>
  );
}

function FullStar() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Full-Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Full-Star">
          <path d={newStarPaths.pc827180} fill="#E8FF36" id="Vector" stroke="black" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Preview() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Preview">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Preview">
          <path d={newStarPaths.pc827180} fill="#E8FF36" id="Vector" stroke="black" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Stars() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Stars">
      <FullStar />
      <FullStar />
      <FullStar />
      <FullStar />
      <Preview />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[14px] text-black" dir="auto">
        123 Reviews
      </p>
    </div>
  );
}

function Reviews() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Reviews">
      <Stars />
      <div className="flex flex-col font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="leading-[18px]">4.8</p>
      </div>
      <Link />
    </div>
  );
}

export default function ProductInfo() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] relative shrink-0 w-full max-w-[520px]" data-name="Description Section">
      <div aria-hidden="true" className="absolute border-[#E3E3E3] border-b border-solid inset-0 pointer-events-none" />
      <Breadcrumbs />
      
      <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full">
        <p className="font-semibold leading-[28px] max-w-[400px] min-w-full not-italic relative shrink-0 text-[24px] text-black uppercase w-[min-content] whitespace-pre-wrap">Music Memories Custom Canvas</p>
        <p className="font-semibold leading-[28px] not-italic relative shrink-0 text-[24px] text-black uppercase">$140</p>
      </div>
      
      <Reviews />
    </div>
  );
}