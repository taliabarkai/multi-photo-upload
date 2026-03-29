import svgPaths from "./svg-acstirnnqo";
import imgImageUploaded from "figma:asset/20f60745315a68fa2f6e0e755a64148df88a3764.png";
import { imgVector } from "./svg-5b18e";

function Paragraph() {
  return (
    <div className="absolute h-[18.003px] left-[12px] top-[14.99px] w-[103.09px]" data-name="Paragraph">
      <p className="absolute font-semibold leading-[18px] left-0 not-italic text-[#1e1e1e] text-[14px] top-[-0.11px] w-[104px] whitespace-pre-wrap">Upload Photos</p>
    </div>
  );
}

function Icon() {
  return (
    <div className="h-[23.993px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.996 13.996">
            <path d={svgPaths.p3bd78600} id="Vector" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.99942" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[464.01px] size-[23.993px] top-[12px]" data-name="Button">
      <Icon />
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute h-[47.986px] left-0 top-0 w-[500px]" data-name="Container">
      <Paragraph />
      <Button />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute bg-[#f5f5f5] h-[47.986px] left-0 top-0 w-[500px]" data-name="Container">
      <Container2 />
    </div>
  );
}

function Arrow() {
  return (
    <div className="absolute contents inset-[16.67%_16.67%_16.67%_16.66%]" data-name="Arrow">
      <div className="absolute inset-[16.67%_16.67%_16.67%_16.66%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0065 12.0065">
          <path d={svgPaths.p2f767e00} fill="var(--fill-0, black)" fillOpacity="0.24" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="h-[18.01px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Arrow />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col h-[18.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[3px] shrink-0 size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2.995px] px-[2.995px] relative size-full">
        <Container6 />
      </div>
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[18px] relative shrink-0 w-[34px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-normal leading-[18px] left-[17px] not-italic text-[#1e1e1e] text-[14px] text-center top-0">1 of 2</p>
      </div>
    </div>
  );
}

function Arrow1() {
  return (
    <div className="absolute contents inset-[16.67%_16.67%_16.67%_16.66%]" data-name="Arrow">
      <div className="absolute inset-[16.67%_16.67%_16.67%_16.66%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.0065 12.0065">
          <path d={svgPaths.p2f767e00} fill="var(--fill-0, black)" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="h-[18.01px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <Arrow1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-col h-[18.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[3px] size-[24px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2.995px] px-[2.995px] relative size-full">
        <Container7 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[15.998px] items-center justify-center relative w-full">
          <Button1 />
          <Paragraph1 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <Button2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageUploaded() {
  return (
    <div className="absolute left-0 size-[467px] top-0" data-name="Image (Uploaded)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImageUploaded} />
    </div>
  );
}

function Icon3() {
  return (
    <div className="h-[14.01px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[35%] left-1/4 right-[35%] top-1/4" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.60388 5.60388">
          <path d={svgPaths.p3c2062c0} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </svg>
      </div>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0104 14.0104">
        <path clipRule="evenodd" d={svgPaths.p1e88df00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col h-[14.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6px] overflow-clip pt-[2.995px] px-[2.995px] size-[20px] top-[6px]" data-name="Container">
      <Container14 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white left-0 overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container13 />
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[14.01px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/2 left-1/4 right-[35%] top-[40%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.60388 1.40112">
          <path d={svgPaths.p2f7ed300} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </svg>
      </div>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14.0104 14.0104">
        <path clipRule="evenodd" d={svgPaths.p1e88df00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col h-[14.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6px] overflow-clip pt-[2.995px] px-[2.995px] size-[20px] top-[6px]" data-name="Container">
      <Container16 />
    </div>
  );
}

function Button4() {
  return (
    <div className="absolute bg-white left-[39.99px] overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container15 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="h-[15px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[10%_13.95%_10%_10%]" data-name="Vector">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.4077 12.0009">
          <path d={svgPaths.p3b38bb00} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[10.01%_16.22%_66%_83.36%]" data-name="Vector">
        <div className="absolute inset-[-15.06%_-857.3%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.14683 4.68163">
            <path d={svgPaths.p2b6d33c0} id="Vector" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[34%_16.22%_63.91%_61.78%]" data-name="Vector">
        <div className="absolute inset-[-172.86%_-16.42%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.38307 1.39716">
            <path d={svgPaths.p13703d80} id="Vector" stroke="var(--stroke-0, #1E1E1E)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.08363" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[15px] top-0" data-name="Container">
      <Icon5 />
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <Container20 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pt-[2.5px] px-[2.5px] size-[20px] top-0" data-name="Container">
      <Container19 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute left-[6px] size-[20px] top-[6px]" data-name="Container">
      <Container18 />
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute bg-white left-[79.98px] overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container17 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[31.997px] left-[16px] top-[16px] w-[111.979px]" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[5.82%_0]" data-name="Group">
      <div className="absolute inset-[5.82%_9.31%_68.6%_83.71%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.393px_0px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.11612 4.09252">
          <path clipRule="evenodd" d={svgPaths.p9a03500} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[15.12%_0.01%_77.9%_74.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.904px_-1.488px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.09253 1.11607">
          <path clipRule="evenodd" d={svgPaths.p26489500} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.14%_0_5.82%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.372px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 13.7647">
          <path clipRule="evenodd" d={svgPaths.p34be1000} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[33.72%_27.91%_22.09%_27.9%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.463px_-4.464px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7.06898 7.06897">
          <path clipRule="evenodd" d={svgPaths.pf33e600} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-[5.82%_0]" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon6() {
  return (
    <div className="h-[15.998px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.998px] top-[8px]" data-name="Container">
      <Icon6 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[15.998px] left-[35.99px] top-[8px] w-[48.62px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal leading-[16px] left-[24.5px] not-italic text-[#1e1e1e] text-[12px] text-center top-[-0.11px]">Replace</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-white h-[31.997px] left-[354.29px] overflow-clip rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] top-[16px] w-[96.606px]" data-name="Button">
      <Container21 />
      <Paragraph2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute h-[63.993px] left-0 top-[402.9px] w-[466.892px]" data-name="Container">
      <Container12 />
      <Button6 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute border-[#d0d0d0] border-[0.556px] border-solid left-0 overflow-clip rounded-[4px] size-[468.004px] top-0" data-name="Container">
      <ImageUploaded />
      <Container11 />
    </div>
  );
}

function Container9() {
  return (
    <div className="absolute left-0 rounded-[4px] size-[468.004px] top-0" data-name="Container">
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative shrink-0 size-[468.004px]" data-name="Container">
      <Container9 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
      <Container5 />
      <Container8 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[77.491px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px]">Add Name:</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute content-stretch flex h-[18.003px] items-center left-0 top-0 w-[468.004px]" data-name="Container">
      <Paragraph3 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[17.995px] items-center left-[12px] overflow-clip top-[15px] w-[424.01px]" data-name="Text Input">
      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#989898] text-[16px]">e.g. John</p>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="absolute h-[14.002px] left-[436.01px] top-[17px] w-[20px]" data-name="Paragraph">
      <p className="absolute font-normal leading-[14px] left-0 not-italic text-[10px] text-black top-0 w-[20px] whitespace-pre-wrap">0/12</p>
    </div>
  );
}

function Container26() {
  return (
    <div className="absolute h-[47.995px] left-0 top-0 w-[468.004px]" data-name="Container">
      <TextInput />
      <Paragraph4 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[47.995px] left-0 overflow-clip rounded-[4px] top-0 w-[468.004px]" data-name="Container">
      <Container26 />
    </div>
  );
}

function Container27() {
  return <div className="absolute border-[#c9c9c9] border-[0.556px] border-solid h-[47.995px] left-0 rounded-[4px] top-0 w-[468.004px]" data-name="Container" />;
}

function Container24() {
  return (
    <div className="absolute h-[47.995px] left-0 rounded-[4px] top-[26px] w-[468.004px]" data-name="Container">
      <Container25 />
      <Container27 />
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[73.993px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container24 />
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] items-start left-[16px] top-[16px] w-[468.004px]">
      <Frame1 />
      <Container22 />
    </div>
  );
}

function Container29() {
  return <div className="absolute border-[#1e1e1e] border-b-[0.556px] border-solid h-[18.003px] left-0 top-0 w-[92.448px]" data-name="Container" />;
}

function Paragraph5() {
  return (
    <div className="absolute h-[18.003px] left-0 top-0 w-[92.448px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[46.5px] not-italic text-[#1e1e1e] text-[14px] text-center top-[-0.11px]">{`Save & Close`}</p>
    </div>
  );
}

function Button7() {
  return (
    <div className="absolute h-[18.003px] left-0 top-[16px] w-[92.448px]" data-name="Button">
      <Container29 />
      <Paragraph5 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[18.003px] left-[23.99px] top-[16px] w-[35.981px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[18px] not-italic text-[14px] text-center text-white top-[-0.11px] tracking-[0.14px] uppercase">next</p>
    </div>
  );
}

function Button8() {
  return (
    <div className="absolute bg-[#aeaeae] h-[50px] left-0 top-0 w-[83.967px]" data-name="Button">
      <Paragraph6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="absolute h-[50px] left-[384.04px] top-0 w-[83.967px]" data-name="Container">
      <Button8 />
    </div>
  );
}

function Container28() {
  return (
    <div className="absolute h-[50px] left-[16px] top-[649.98px] w-[468.004px]" data-name="Container">
      <Button7 />
      <Container30 />
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[715.981px] overflow-clip relative shrink-0 w-full" data-name="Container">
      <Frame />
      <Container28 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[715.981px] items-start left-0 overflow-clip top-[47.99px] w-[500px]" data-name="Container">
      <Container4 />
    </div>
  );
}

export default function Container() {
  return (
    <div className="bg-white overflow-clip relative rounded-[8px] size-full" data-name="Container">
      <Container1 />
      <Container3 />
    </div>
  );
}