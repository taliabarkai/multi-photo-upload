import svgPaths from "./svg-8jp3g9yxdw";

function Group() {
  return (
    <div className="absolute inset-[15%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 4">
          <path d={svgPaths.p10022c00} fill="var(--fill-0, #1E1E1E)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pfcdd300} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Frame">
      <Group />
    </div>
  );
}

function IconButton() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px]" data-name="Icon Button">
      <Frame />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[15%]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Group 4">
          <path d={svgPaths.pc463800} fill="var(--fill-0, #1E1E1E)" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.pfcdd300} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[20px]" data-name="Frame">
      <Group1 />
    </div>
  );
}

function IconButton1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px]" data-name="Icon Button">
      <Frame1 />
    </div>
  );
}

function Group2() {
  return (
    <div className="relative size-full">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 15">
        <g id="Group">
          <path d={svgPaths.p1f653180} fill="var(--stroke-0, #1E1E1E)" id="Vector" />
          <path d={svgPaths.p65bac00} id="Vector_2" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
          <path d={svgPaths.p21ab7400} id="Vector_3" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
        </g>
      </svg>
    </div>
  );
}

function Frame2() {
  return (
    <div className="overflow-clip relative size-[20px]" data-name="Frame">
      <div className="absolute flex inset-[12.5%] items-center justify-center">
        <div className="-scale-y-100 flex-none rotate-180 size-[15px]">
          <Group2 />
        </div>
      </div>
    </div>
  );
}

function IconButton2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center overflow-clip p-[12px] relative rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 size-[32px]" data-name="Icon Button">
      <div className="flex items-center justify-center relative shrink-0">
        <div className="-scale-y-100 flex-none rotate-180">
          <Frame2 />
        </div>
      </div>
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative size-full">
      <IconButton />
      <IconButton1 />
      <IconButton2 />
    </div>
  );
}