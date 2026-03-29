import svgPaths from "./svg-y6oy8cgdfl";

function FullStar1() {
  return (
    <div className="absolute contents inset-[9.71%_9.4%_9.05%_9.4%]" data-name="Full-Star">
      <div className="absolute inset-[9.71%_9.4%_9.05%_9.4%]" data-name="Vector">
        <div className="absolute inset-[-5.12%_-4.74%_-4.31%_-4.73%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17.7772 17.7789">
            <path d={svgPaths.pc827180} fill="var(--fill-0, #D1D1D1)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <FullStar1 />
    </div>
  );
}

export default function FullStar() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="FullStar">
      <Icon />
    </div>
  );
}