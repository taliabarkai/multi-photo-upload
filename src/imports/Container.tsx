import svgPaths from "./svg-cqty5kzprz";

function Frame() {
  return (
    <div className="absolute inset-[12.5%_12.49%_12.5%_12.51%]" data-name="Frame">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Frame">
          <path d={svgPaths.pbc71b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.216" />
        </g>
      </svg>
    </div>
  );
}

function Replace() {
  return (
    <div className="relative shrink-0 size-[32px]" data-name="Replace">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <Frame />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-[#f5f5f5] content-stretch flex items-center justify-center relative rounded-[3.6px] shrink-0 size-[72px]" data-name="Container">
      <Replace />
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.997px] items-start min-h-px min-w-px not-italic relative" data-name="Container">
      <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Photo 3</p>
      <p className="font-normal leading-[16px] relative shrink-0 text-[#989898] text-[12px] w-[164px] whitespace-pre-wrap">Click to upload photo</p>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Close">
          <path d={svgPaths.p3afaf600} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[328.46px] rounded-[18641400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[20px] top-[-2px]" data-name="Button">
      <Close />
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[24px] items-center pl-[8px] pr-[12px] py-[8px] relative rounded-[4px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container1 />
      <Container2 />
      <Button />
    </div>
  );
}