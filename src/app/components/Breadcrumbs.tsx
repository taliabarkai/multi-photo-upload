import svgPaths from '../../imports/svg-evybfy9nu9';

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g>
          <path clipRule="evenodd" d={svgPaths.p9945e80} fill="black" fillRule="evenodd" />
        </g>
      </svg>
    </div>
  );
}

export default function Breadcrumbs() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#1f1f1f] text-[12px]">Home</p>
      <Chevron />
      <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#1f1f1f] text-[12px]">Category</p>
    </div>
  );
}
