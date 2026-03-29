import svgPaths from "./svg-10z498b7ka";

function Group() {
  return (
    <div className="h-[17.365px] relative w-[0.056px]">
      <div className="absolute inset-[-2.58%_-5879.69%_-2.58%_-5858.1%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.62128 18.2607">
          <g id="Group 1200">
            <path d={svgPaths.p7c480} fill="var(--stroke-0, #1E1E1E)" id="Arrow 2" />
            <path d={svgPaths.p14bdfd80} fill="var(--stroke-0, #1E1E1E)" id="Arrow 1" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default function Arrow() {
  return (
    <div className="bg-[rgba(255,255,255,0.4)] content-stretch flex flex-col items-center justify-center px-[3.2px] py-[9.6px] relative rounded-[8px] size-full">
      <div className="absolute flex items-center justify-center left-[5.81px] size-[12.319px] top-[5.97px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "18.875" } as React.CSSProperties}>
        <div className="-rotate-45 flex-none">
          <Group />
        </div>
      </div>
    </div>
  );
}