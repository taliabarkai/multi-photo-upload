import svgPaths from "./svg-rrmye4l25l";

function Group() {
  return (
    <div className="absolute inset-[20.55%_16.66%_20.55%_16.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3334 11.7817">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p3b43f00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p34b9ba00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p2fbfe400} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.pc4c3192} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Photo() {
  return (
    <div className="-translate-y-1/2 absolute left-[12px] overflow-clip size-[20px] top-[calc(50%-0.05px)]" data-name="Photo">
      <Group />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="absolute h-[15.998px] left-[39.99px] top-[8px] w-[48.62px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal leading-[16px] left-[24.5px] not-italic text-[#1e1e1e] text-[12px] text-center top-[-0.11px]">Replace</p>
    </div>
  );
}

export default function Button() {
  return (
    <div className="bg-white overflow-clip relative rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-full" data-name="Button">
      <Photo />
      <Paragraph />
    </div>
  );
}