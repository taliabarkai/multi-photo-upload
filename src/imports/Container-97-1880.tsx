import svgPaths from "./svg-dsy85ri02n";

function Paragraph() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[193.481px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[0] left-0 not-italic text-[0px] text-[14px] text-black top-[-0.11px]">
          <span className="leading-[18px]">Personalize your pendants</span>
          <span className="font-normal leading-[18px] text-[#666]">{` (0 of 1):`}</span>
        </p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[18.003px] items-center justify-between left-0 pr-[246.519px] top-0 w-[440px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[24.01px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[17.12%]" data-name="Vector">
        <div className="absolute inset-[-0.68%_-0.68%_-0.68%_-0.69%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.0005 16.0052">
            <path d={svgPaths.p2be8cd00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.216055" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col h-[24.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[20px] overflow-clip pl-[4.002px] pr-[3.993px] pt-[3.993px] size-[31.997px] top-[20px]" data-name="Container">
      <Container4 />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f5f5f5] relative rounded-[3.6px] shrink-0 size-[71.997px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[132.083px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[70px] not-italic text-[14px] text-black text-center top-[-0.11px]">Upload your photos</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[209.583px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[16px] left-0 not-italic text-[#666] text-[12px] top-[-0.11px]">Select 4 photos and add a name for each</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col gap-[3.993px] items-start relative shrink-0 w-[209.583px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function Button() {
  return (
    <div className="h-[89.983px] relative rounded-[4px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#c41314] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[9px] relative size-full">
          <Container2 />
          <Container5 />
        </div>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[15.998px] left-[27.99px] top-[3.99px] w-[146.12px]" data-name="Paragraph">
      <p className="absolute font-normal leading-[16px] left-0 not-italic text-[#c41314] text-[12px] top-[-0.11px]">Please upload an image and enter a name</p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[14.392px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.3924 14.3924">
        <path clipRule="evenodd" d={svgPaths.p3f7c700} fill="var(--fill-0, #C41314)" fillRule="evenodd" id="Vector" />
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[14.392px] top-0" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[14.392px] relative shrink-0 w-full" data-name="Container">
      <Container9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pl-[5px] pr-[4.601px] pt-[5px] size-[23.993px] top-0" data-name="Container">
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[23.993px] relative shrink-0 w-[198.099px]" data-name="Container">
      <Paragraph3 />
      <Container7 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] items-start left-0 top-[26px] w-[442px]">
      <Button />
      <Container6 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Frame />
    </div>
  );
}