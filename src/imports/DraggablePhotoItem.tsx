import svgPaths from "./svg-fj29ski164";
import imgImagePhoto2 from "figma:asset/88f31eb8ff3ced0d766e844e5be159fab9a8b1d0.png";

function DragIndicatorFilled1() {
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
      <DragIndicatorFilled1 />
    </div>
  );
}

function DragIndicatorFilled() {
  return (
    <div className="absolute content-stretch flex flex-col h-[16.007px] items-start left-[18.99px] top-[39.99px] w-[10px]" data-name="DragIndicatorFilled">
      <Icon />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[115.2px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Pendant 2</p>
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[115.2px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-medium leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
          <span className="leading-[20px]">{`Name: `}</span>
          <span className="font-normal leading-[20px] text-[#808080]">No name added</span>
        </p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[41.997px] items-start left-[95.99px] top-[15px] w-[115.2px]" data-name="Container">
      <Paragraph />
      <Paragraph1 />
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

function Icon1() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 71.9965 71.9965">
        <g clipPath="url(#clip0_146_896)" id="Icon">
          <path clipRule="evenodd" d={svgPaths.p281b5300} fill="var(--fill-0, white)" fillRule="evenodd" id="Vector" />
          <path d={svgPaths.p17f5c400} id="Vector_2" stroke="var(--stroke-0, #D4AF37)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.87986" />
        </g>
        <defs>
          <clipPath id="clip0_146_896">
            <rect fill="white" height="71.9965" width="71.9965" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[71.997px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <ImagePhoto />
      <Icon1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <Container5 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[71.997px] left-[51.99px] top-[12px] w-[325.755px]" data-name="Button">
      <Container3 />
      <Container4 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute h-[18.003px] left-[393.74px] top-[38.99px] w-[34.262px]" data-name="Button">
      <p className="-translate-x-1/2 absolute decoration-solid font-semibold leading-[18px] left-[13.5px] not-italic text-[14px] text-black text-center top-[-0.11px] underline whitespace-nowrap">Edit</p>
    </div>
  );
}

function Container6() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Container2() {
  return (
    <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container">
      <DragIndicatorFilled />
      <Button />
      <Button1 />
      <Container6 />
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container2 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex h-[95.99px] items-center left-0 top-0 w-[440px]" data-name="Container">
      <Container1 />
    </div>
  );
}

function Container7() {
  return <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon2() {
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
      <Icon2 />
    </div>
  );
}

export default function DraggablePhotoItem() {
  return (
    <div className="relative size-full" data-name="DraggablePhotoItem">
      <Container />
      <Container7 />
      <Button2 />
    </div>
  );
}