import svgPaths from "./svg-qx303ww8pd";
import imgImagePhoto3 from "figma:asset/20f60745315a68fa2f6e0e755a64148df88a3764.png";

function Warning() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Warning">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Warning">
          <path clipRule="evenodd" d={svgPaths.p8495c00} fill="var(--fill-0, #C41314)" fillRule="evenodd" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[4px] items-start relative shrink-0 w-full">
      <Warning />
      <p className="flex-[1_0_0] font-normal leading-[18px] min-h-px min-w-px not-italic relative text-[#c41314] text-[14px] whitespace-pre-wrap">Image too small (181x181). Minimum: 600px 600px</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="-translate-y-1/2 absolute content-stretch flex flex-col gap-[4px] items-start left-[96.01px] top-[calc(50%-0.82px)] w-[248px]" data-name="Paragraph">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black w-[53px] whitespace-pre-wrap">Photo 3</p>
      <Frame />
    </div>
  );
}

function ImagePhoto() {
  return (
    <div className="absolute left-0 size-[71.997px] top-0" data-name="Image (Photo 3)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImagePhoto3} />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-0" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23.9931 23.9931">
        <path d={svgPaths.p31f6df00} fill="var(--fill-0, white)" fillOpacity="0.4" id="Vector" />
      </svg>
      <div className="absolute inset-[23.03%_22.63%_21.92%_22.47%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.1712 13.2081">
          <path d={svgPaths.p263aab00} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[23.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Group />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[44.01px] size-[23.993px] top-[44.01px]" data-name="Container">
      <Icon />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute left-0 overflow-clip rounded-[4px] size-[71.997px] top-0" data-name="Container">
      <ImagePhoto />
      <Container4 />
    </div>
  );
}

function Button() {
  return (
    <div className="flex-[1_0_0] h-[71.997px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Paragraph />
        <Container3 />
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
    <div className="absolute content-stretch flex h-[95.99px] items-center justify-between left-0 px-[11.997px] top-0 w-[445.781px]" data-name="Container">
      <Button />
      <Button1 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[95.99px] left-0 top-0 w-[445.781px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Container5() {
  return <div className="absolute border-[#e3e3e3] border-[0.556px] border-solid h-[95.99px] left-0 rounded-[4px] top-0 w-[445.781px]" data-name="Container" />;
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
    <div className="absolute bg-white content-stretch flex flex-col items-start left-[424.68px] pb-[0.556px] pt-[4.549px] px-[4.549px] rounded-[100px] size-[25.095px] top-[-3.99px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#e3e3e3] border-[0.556px] border-solid inset-0 pointer-events-none rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.15)]" />
      <Icon1 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="relative size-full" data-name="Container">
      <Container1 />
      <Container5 />
      <Button2 />
    </div>
  );
}