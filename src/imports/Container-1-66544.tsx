import svgPaths from "./svg-ipwxmdynxa";

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
    <div className="bg-[#f5f5f5] relative rounded-[3.6px] shrink-0 size-[72px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Replace />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[38.003px] relative shrink-0 w-[231.684px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start not-italic relative size-full">
        <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Upload Multiple Photos at Once</p>
        <p className="font-normal leading-[16px] relative shrink-0 text-[#666] text-[12px]">Select up to 3 photos from your device</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center p-[9px] relative rounded-[4px] size-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#f5f5f5] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <Container1 />
      <Container2 />
    </div>
  );
}