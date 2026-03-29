import svgPaths from "./svg-3swzp0fdpa";
import imgImagePhoto1 from "figma:asset/88f31eb8ff3ced0d766e844e5be159fab9a8b1d0.png";
import imgImagePhoto2 from "figma:asset/c684715aa9e1ac830aecb765a6b111cf104a8979.png";

function Paragraph() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[245.556px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Mandatory</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[194.444px] relative size-full">
          <Paragraph />
        </div>
      </div>
    </div>
  );
}

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

function Paragraph1() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Pendant 1</p>
      </div>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[15.998px] left-[27.99px] top-[3.99px] w-[123.819px]" data-name="Paragraph">
      <p className="absolute font-normal leading-[16px] left-0 not-italic text-[#c41314] text-[12px] top-[-0.11px] whitespace-nowrap">Please enter a name</p>
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

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[14.392px] top-0" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="h-[14.392px] relative shrink-0 w-full" data-name="Container">
      <Container8 />
    </div>
  );
}

function ValidationErrorIcon() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pl-[5px] pr-[4.601px] pt-[5px] size-[23.993px] top-0" data-name="ValidationErrorIcon">
      <Container7 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute h-[23.993px] left-0 top-[-0.11px] w-[151.806px]" data-name="Container">
      <Paragraph3 />
      <ValidationErrorIcon />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[40px] items-start left-[95.99px] top-[16px] w-[114.549px]" data-name="Container">
      <Paragraph1 />
      <Paragraph2 />
    </div>
  );
}

function ImagePhoto() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Image (Photo 1)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto1} />
    </div>
  );
}

function Icon2() {
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

function Container10() {
  return (
    <div className="bg-white h-[71.997px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <ImagePhoto />
      <Icon2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Button() {
  return (
    <div className="absolute h-[71.997px] left-[51.99px] top-[12px] w-[325.755px]" data-name="Button">
      <Container5 />
      <Container9 />
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

function Container11() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Container4() {
  return (
    <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container">
      <DragIndicatorFilled />
      <Button />
      <Button1 />
      <Container11 />
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container4 />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute content-stretch flex h-[95.99px] items-center left-0 top-0 w-[440px]" data-name="Container">
      <Container3 />
    </div>
  );
}

function Container12() {
  return <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon3() {
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
      <Icon3 />
    </div>
  );
}

function DraggablePhotoItem() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="DraggablePhotoItem">
      <Container2 />
      <Container12 />
      <Button2 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[245.556px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Informative</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[194.444px] pt-[20px] relative w-full">
          <Paragraph4 />
        </div>
      </div>
    </div>
  );
}

function DragIndicatorFilled3() {
  return (
    <div className="absolute contents inset-0" data-name="DragIndicatorFilled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.0069">
        <path d={svgPaths.pd87bd00} fill="var(--fill-0, black)" fillOpacity="0.56" id="Vector" />
      </svg>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[16.007px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <DragIndicatorFilled3 />
    </div>
  );
}

function DragIndicatorFilled2() {
  return (
    <div className="absolute content-stretch flex flex-col h-[16.007px] items-start left-[18.99px] top-[39.99px] w-[10px]" data-name="DragIndicatorFilled">
      <Icon4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Pendant 1</p>
      </div>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[15.998px] left-[-0.01px] top-[0.99px] w-[123.819px]" data-name="Paragraph">
      <p className="absolute font-normal leading-[20px] left-0 not-italic text-[#989898] text-[14px] top-[-0.11px] whitespace-nowrap">No Name Added</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[23.993px] left-0 top-[-0.11px] w-[151.806px]" data-name="Container">
      <Paragraph7 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container18 />
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[40px] items-start left-[95.99px] top-[16px] w-[114.549px]" data-name="Container">
      <Paragraph5 />
      <Paragraph6 />
    </div>
  );
}

function ImagePhoto1() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Image (Photo 1)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto1} />
    </div>
  );
}

function Icon5() {
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

function Container20() {
  return (
    <div className="bg-white h-[71.997px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <ImagePhoto1 />
      <Icon5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <Container20 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute h-[71.997px] left-[51.99px] top-[12px] w-[325.755px]" data-name="Button">
      <Container17 />
      <Container19 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute h-[18.003px] left-[393.74px] top-[38.99px] w-[34.262px]" data-name="Button">
      <p className="-translate-x-1/2 absolute decoration-solid font-semibold leading-[18px] left-[13.5px] not-italic text-[14px] text-black text-center top-[-0.11px] underline whitespace-nowrap">Edit</p>
    </div>
  );
}

function Container21() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Container16() {
  return (
    <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container">
      <DragIndicatorFilled2 />
      <Button3 />
      <Button4 />
      <Container21 />
    </div>
  );
}

function Container15() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container16 />
      </div>
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex h-[95.99px] items-center left-0 top-0 w-[440px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Container22() {
  return <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon6() {
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

function Button5() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[418.9px] pb-[0.556px] pt-[4.549px] px-[4.549px] rounded-[100px] size-[25.095px] top-[-3.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />
      <Icon6 />
    </div>
  );
}

function DraggablePhotoItem1() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="DraggablePhotoItem">
      <Container14 />
      <Container22 />
      <Button5 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[245.556px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Saved Name</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[194.444px] pt-[20px] relative w-full">
          <Paragraph8 />
        </div>
      </div>
    </div>
  );
}

function DragIndicatorFilled5() {
  return (
    <div className="absolute contents inset-0" data-name="DragIndicatorFilled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16.0069">
        <path d={svgPaths.pd87bd00} fill="var(--fill-0, black)" fillOpacity="0.56" id="Vector" />
      </svg>
    </div>
  );
}

function Icon7() {
  return (
    <div className="h-[16.007px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <DragIndicatorFilled5 />
    </div>
  );
}

function DragIndicatorFilled4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[16.007px] items-start left-[18.99px] top-[39.99px] w-[10px]" data-name="DragIndicatorFilled">
      <Icon7 />
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">Pendant 2</p>
      </div>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[114.549px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px] whitespace-nowrap">John</p>
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[3.993px] h-[40px] items-start left-[95.99px] top-[16px] w-[114.549px]" data-name="Container">
      <Paragraph9 />
      <Paragraph10 />
    </div>
  );
}

function ImagePhoto2() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Image (Photo 2)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto2} />
    </div>
  );
}

function Icon8() {
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

function Container29() {
  return (
    <div className="bg-white h-[71.997px] overflow-clip relative rounded-[4px] shrink-0 w-full" data-name="Container">
      <ImagePhoto2 />
      <Icon8 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <Container29 />
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute h-[71.997px] left-[51.99px] top-[12px] w-[325.755px]" data-name="Button">
      <Container27 />
      <Container28 />
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[18.003px] left-[393.74px] top-[38.99px] w-[34.262px]" data-name="Button">
      <p className="-translate-x-1/2 absolute decoration-solid font-semibold leading-[18px] left-[13.5px] not-italic text-[14px] text-black text-center top-[-0.11px] underline whitespace-nowrap">Edit</p>
    </div>
  );
}

function Container30() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Container26() {
  return (
    <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container">
      <DragIndicatorFilled4 />
      <Button6 />
      <Button7 />
      <Container30 />
    </div>
  );
}

function Container25() {
  return (
    <div className="flex-[1_0_0] h-[95.99px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container26 />
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="absolute content-stretch flex h-[95.99px] items-center left-0 top-0 w-[440px]" data-name="Container">
      <Container25 />
    </div>
  );
}

function Container31() {
  return <div className="absolute h-[95.99px] left-0 rounded-[4px] top-0 w-[440px]" data-name="Container" />;
}

function Icon9() {
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

function Button8() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[418.9px] pb-[0.556px] pt-[4.549px] px-[4.549px] rounded-[100px] size-[25.095px] top-[-3.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />
      <Icon9 />
    </div>
  );
}

function DraggablePhotoItem2() {
  return (
    <div className="h-[95.99px] relative shrink-0 w-full" data-name="DraggablePhotoItem">
      <Container24 />
      <Container31 />
      <Button8 />
    </div>
  );
}

function PhotoListContent() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[444px]" data-name="PhotoListContent">
      <Container1 />
      <DraggablePhotoItem />
      <Container13 />
      <DraggablePhotoItem1 />
      <Container23 />
      <DraggablePhotoItem2 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start p-[24px] relative size-full" data-name="Container">
      <PhotoListContent />
    </div>
  );
}