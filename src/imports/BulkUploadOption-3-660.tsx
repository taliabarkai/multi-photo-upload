import svgPaths from "./svg-we5zcosvzf";

function Paragraph() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[142.144px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-medium leading-[0] left-0 not-italic text-[14px] text-black top-[-0.11px]">
          <span className="font-semibold leading-[18px]">Upload your photos</span>
          <span className="leading-[18px]">{` (`}</span>
          <span className="font-normal leading-[18px]">0 of 2)</span>
          <span className="leading-[18px]">:</span>
        </p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return <div className="h-[18.003px] shrink-0 w-[23.516px]" data-name="Paragraph" />;
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[18.003px] items-center justify-between left-0 top-0 w-[358.003px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
    </div>
  );
}

function Container1() {
  return <div className="absolute border-[#f5f5f5] border-[0.556px] border-solid h-[89.983px] left-0 rounded-[4px] top-0 w-[358.003px]" data-name="Container" />;
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
    <div className="absolute bg-[#f5f5f5] left-[8.99px] rounded-[3.6px] size-[71.997px] top-[8.99px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[222.396px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[111.5px] not-italic text-[14px] text-black text-center top-[-0.11px]">Upload Multiple Photos at Once</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[230.391px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-normal leading-[16px] left-[115.5px] not-italic text-[#666] text-[12px] text-center top-[-0.11px]">Select up to 2 photos from your device</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[37.995px] items-start left-[96.99px] top-[25.99px] w-[230.391px]" data-name="Container">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[89.983px] left-0 rounded-[4px] top-[26px] w-[358.003px]" data-name="Button">
      <Container1 />
      <Container2 />
      <Container5 />
    </div>
  );
}

export default function BulkUploadOption() {
  return (
    <div className="relative size-full" data-name="BulkUploadOption">
      <Container />
      <Button />
    </div>
  );
}