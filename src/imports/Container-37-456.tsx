import svgPaths from "./svg-hy96mm4hpe";
import imgImagePhoto2 from "figma:asset/c684715aa9e1ac830aecb765a6b111cf104a8979.png";

function Frame1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0">
      <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#f36641] text-[14px] w-full whitespace-pre-wrap">Low-Resolution Image</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="overflow-clip relative size-[12px]" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-10%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
            <path d={svgPaths.p177389f0} id="Vector" stroke="var(--stroke-0, #F04012)" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[-8.33%] flex items-center justify-center left-1/4 right-[33.33%] top-[-8.33%]">
        <div className="flex-none h-[14px] rotate-180 w-[5px]">
          <p className="font-medium leading-[14px] not-italic relative text-[#f04012] text-[8px]">?</p>
        </div>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
      <Frame1 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-180">
          <Icon />
        </div>
      </div>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start relative">
        <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black w-[53px] whitespace-pre-wrap">Photo 2</p>
        <Frame />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col items-start justify-center left-[95.99px] top-[15.94px]" data-name="Container">
      <Paragraph />
    </div>
  );
}

function ImagePhoto() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Image (Photo 2)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto2} />
    </div>
  );
}

function Vector() {
  return (
    <div className="absolute contents inset-[35.04%_49.96%_44.97%_50.04%]" data-name="Vector_2">
      <div className="absolute inset-[35.04%_49.96%_44.97%_50.04%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[35.04%_49.96%_44.97%_50.04%]" data-name="Vector">
        <div className="absolute inset-[-25.01%_-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.66544 4.99472">
            <path d="M0.832718 0.832718V4.162" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66544" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Vector1() {
  return (
    <div className="absolute contents inset-[75.02%_49.92%_24.98%_50.04%]" data-name="Vector_3">
      <div className="absolute inset-[75.02%_49.92%_24.98%_50.04%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
          <g id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[75.02%_49.92%_24.98%_50.04%]" data-name="Vector">
        <div className="absolute inset-[-0.83px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.67273 1.66544">
            <path d="M0.832718 0.832718H0.840008" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66544" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute contents inset-[5%_4.54%]" data-name="Icon">
      <div className="absolute inset-[5%_4.54%]" data-name="Vector">
        <div className="absolute inset-[-5.55%_-4.99%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.3411 16.6588">
            <path d={svgPaths.p17f22900} fill="var(--fill-0, #F36641)" id="Vector" stroke="var(--stroke-0, #F36641)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66544" />
          </svg>
        </div>
      </div>
      <Vector />
      <Vector1 />
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[16.658px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Icon3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex flex-col h-[16.658px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute content-stretch flex flex-col h-[15.009px] items-start left-[6.85px] pt-[-0.825px] px-[-0.833px] top-[5.69px] w-[16.675px]" data-name="Icon">
      <Container5 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <ImagePhoto />
      <Icon1 />
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-[71.997px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container3 />
        <Container4 />
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[65.556px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute decoration-solid font-semibold leading-[18px] left-[29px] not-italic text-[14px] text-black text-center top-[-0.11px] underline">Replace</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[95.99px] items-center justify-between left-0 px-[11.997px] top-0 w-[440px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[95.99px] left-0 top-0 w-[440px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container6() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon4() {
  return (
    <div className="h-[15.998px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[24.99%] left-1/4 right-[24.99%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-9.37%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.49984 9.49984">
            <path d={svgPaths.pc69b880} id="Vector" stroke="var(--stroke-0, black)" strokeLinecap="round" strokeWidth="1.49984" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[418.9px] pb-[0.556px] pt-[4.549px] px-[4.549px] rounded-[100px] size-[25.095px] top-[-3.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />
      <Icon4 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Container6 />
      <Button2 />
    </div>
  );
}