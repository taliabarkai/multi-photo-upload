import svgPaths from "./svg-i91fzt1ua4";
import imgImagePhoto2 from "figma:asset/c684715aa9e1ac830aecb765a6b111cf104a8979.png";

function Paragraph() {
  return <div className="absolute h-[15.998px] left-[12px] top-[99.98px] w-[416.007px]" data-name="Paragraph" />;
}

function DragIndicatorFilled() {
  return (
    <div className="absolute contents inset-0" data-name="DragIndicatorFilled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.0069">
        <path d={svgPaths.pd87bd00} fill="var(--fill-0, black)" fillOpacity="0.56" id="Vector" />
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[16.007px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <DragIndicatorFilled />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[16.007px] items-start left-[18.99px] top-[39.99px] w-[10px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[106px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px]">Photo 2</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[15.998px] relative shrink-0 w-[105.642px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[16px] left-0 not-italic text-[#666] text-[12px] top-[-0.11px]">Name: Not added</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="relative shrink-0" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative">
        <div className="overflow-clip relative shrink-0 size-[24px]" data-name="Warning">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute flex h-[14.398px] items-center justify-center left-[calc(50%+0.2px)] top-[calc(50%+0.2px)] w-[14.399px]">
            <div className="flex-none rotate-180">
              <div className="h-[14.398px] relative w-[14.399px]" data-name="Vector">
                <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.399 14.3981">
                  <path clipRule="evenodd" d={svgPaths.p296b6180} fill="var(--fill-0, #C41314)" fillRule="evenodd" id="Vector" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <p className="font-normal leading-[16px] not-italic relative shrink-0 text-[#c41314] text-[12px]">Please add name</p>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[1.997px] items-start left-[96.01px] top-[calc(50%+0.01px)] w-[134px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function ImagePhoto() {
  return (
    <div className="h-[71.997px] relative shrink-0 w-full" data-name="Image (Photo 2)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto2} />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <ImagePhoto />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[71.997px] left-[51.99px] top-[12px] w-[325.755px]" data-name="Button">
      <Container5 />
      <Container6 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[18.003px] left-[393.74px] top-[38.99px] w-[34.262px]" data-name="Button">
      <p className="-translate-x-1/2 absolute decoration-solid font-semibold leading-[18px] left-[13.5px] not-italic text-[14px] text-black text-center top-[-0.11px] underline">Edit</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute h-[95.99px] left-0 top-0 w-[440px]" data-name="Container">
      <Container4 />
      <Button />
      <Button1 />
    </div>
  );
}

function Container2() {
  return (
    <div className="flex-[1_0_0] h-[123.976px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <Container3 />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex h-[123.976px] items-center left-0 top-0 w-[440px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container7() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[100px] left-[-1px] rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon1() {
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
      <Icon1 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Container7 />
      <Button2 />
    </div>
  );
}