import svgPaths from "./svg-xbtf6ku992";

function Paragraph() {
  return (
    <div className="absolute h-[18.003px] left-[9.75px] top-[2.99px] w-[4.488px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal h-[12px] leading-[16px] left-[calc(50%-0.02px)] not-italic text-[12px] text-center text-white top-[calc(50%-6.99px)] w-[4px] whitespace-pre-wrap">1</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-full" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Button() {
  return (
    <div className="bg-black content-stretch flex flex-col items-start relative rounded-[100px] shrink-0 size-[23.984px]" data-name="Button">
      <Container1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[18.003px] left-[9.75px] top-[2.99px] w-[4.488px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal h-[12px] leading-[16px] left-[calc(50%-0.02px)] not-italic text-[12px] text-center text-white top-[calc(50%-6.99px)] w-[4px] whitespace-pre-wrap">2</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-full" data-name="Container">
      <Paragraph1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-black content-stretch flex flex-col items-start relative rounded-[100px] shrink-0 size-[23.984px]" data-name="Button">
      <Container2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[18.003px] left-[9.75px] top-[2.99px] w-[4.488px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal h-[12px] leading-[16px] left-[calc(50%-0.02px)] not-italic text-[12px] text-black text-center top-[calc(50%-6.99px)] w-[4px] whitespace-pre-wrap">3</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[23.984px] relative shrink-0 w-full" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[100px] shrink-0 size-[23.984px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e3e3e3] border-solid inset-0 pointer-events-none rounded-[100px]" />
      <Container3 />
    </div>
  );
}

function Container() {
  return (
    <div className="content-center flex flex-wrap gap-[0px_72px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <div className="absolute h-0 left-[143px] top-[13px] w-[178px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 178 1">
            <line id="Line 79" stroke="var(--stroke-0, #E3E3E3)" x2="178" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <div className="absolute h-0 left-[147px] top-[12.5px] w-[79.5px]">
        <div className="absolute inset-[-0.5px_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 79.5 1.00007">
            <path d={svgPaths.p395b2300} id="Line 80" stroke="var(--stroke-0, black)" />
          </svg>
        </div>
      </div>
      <Button />
      <Button1 />
      <Button2 />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="content-stretch flex flex-col items-start p-[8px] relative size-full">
      <Container />
    </div>
  );
}