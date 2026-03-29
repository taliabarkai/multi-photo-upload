import svgPaths from "./svg-92ewmycey8";
import imgImageUploaded from "figma:asset/ad9232b12df40d53fe9b4a369ae86d3dd9f15d5b.png";
import { imgVector } from "./svg-fgqs6";

function Paragraph() {
  return (
    <div className="absolute h-[18.003px] left-[12px] top-[14.99px] w-[141.545px]" data-name="Paragraph">
      <p className="absolute font-semibold leading-[0] left-0 not-italic text-[#1e1e1e] text-[0px] text-[14px] top-[-0.11px] w-[142px] whitespace-pre-wrap">
        <span className="leading-[18px]">{`Upload Photo `}</span>
        <span className="font-normal leading-[18px]">(1 of 1)</span>
      </p>
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

function Container5() {
  return <div className="absolute h-[3.993px] left-[16px] top-0 w-0" data-name="Container" />;
}

function ImageUploaded() {
  return (
    <div className="absolute left-0 rounded-[4px] size-[468px] top-0" data-name="Image (Uploaded)">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgImageUploaded} />
    </div>
  );
}

function Icon1() {
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

function Container11() {
  return (
    <div className="content-stretch flex flex-col h-[14.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon1 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6px] overflow-clip pt-[2.995px] px-[2.995px] size-[20px] top-[6px]" data-name="Container">
      <Container11 />
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white left-0 overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container10 />
    </div>
  );
}

function Icon2() {
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

function Container13() {
  return (
    <div className="content-stretch flex flex-col h-[14.01px] items-start relative shrink-0 w-full" data-name="Container">
      <Icon2 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[6px] overflow-clip pt-[2.995px] px-[2.995px] size-[20px] top-[6px]" data-name="Container">
      <Container13 />
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white left-[39.99px] overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container12 />
    </div>
  );
}

function Icon3() {
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

function Container17() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 size-[15px] top-0" data-name="Container">
      <Icon3 />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[15px] relative shrink-0 w-full" data-name="Container">
      <Container17 />
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 overflow-clip pt-[2.5px] px-[2.5px] size-[20px] top-0" data-name="Container">
      <Container16 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute left-[6px] size-[20px] top-[6px]" data-name="Container">
      <Container15 />
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute bg-white left-[79.98px] overflow-clip rounded-[100px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] size-[31.997px] top-0" data-name="Button">
      <Container14 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[31.997px] relative shrink-0 w-[111.979px]" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[5.82%_0]" data-name="Group">
      <div className="absolute inset-[5.82%_9.31%_68.6%_83.71%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-13.392px_0px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.11612 4.09252">
          <path clipRule="evenodd" d={svgPaths.p9a03500} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[15.12%_0.01%_77.9%_74.41%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-11.905px_-1.488px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4.09253 1.11607">
          <path clipRule="evenodd" d={svgPaths.p26489500} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[8.14%_0_5.82%_0] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px_-0.372px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.9983 13.7647">
          <path clipRule="evenodd" d={svgPaths.p34be1000} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
        </svg>
      </div>
      <div className="absolute inset-[33.72%_27.91%_22.09%_27.9%] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-4.464px_-4.464px] mask-size-[15.998px_14.137px]" data-name="Vector" style={{ maskImage: `url('${imgVector}')` }}>
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

function Icon4() {
  return (
    <div className="h-[15.998px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-[12px] size-[15.998px] top-[8px]" data-name="Container">
      <Icon4 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="absolute h-[15.998px] left-[35.99px] top-[8px] w-[48.62px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-normal leading-[16px] left-[24.5px] not-italic text-[#1e1e1e] text-[12px] text-center top-[-0.11px]">Replace</p>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[31.997px] overflow-clip relative rounded-[4px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.25)] shrink-0 w-[96.606px]" data-name="Button">
      <Container18 />
      <Paragraph1 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex items-center justify-between left-0 p-[24px] top-[388.34px] w-[468.004px]" data-name="Container">
      <Container9 />
      <Button4 />
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute left-0 rounded-[4px] size-[468px] top-0" data-name="Container">
      <ImageUploaded />
      <Container8 />
    </div>
  );
}

function Container6() {
  return (
    <div className="absolute left-[15.56px] size-[468px] top-[20.33px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[18.003px] relative shrink-0 w-[45.391px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-normal leading-[18px] left-0 not-italic text-[14px] text-black top-[-0.11px]">Name:</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex h-[18.003px] items-center left-0 top-0 w-[468.004px]" data-name="Container">
      <Paragraph2 />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute content-stretch flex h-[17.995px] items-center left-[12px] overflow-clip top-[15px] w-[424.01px]" data-name="Text Input">
      <p className="font-normal leading-[normal] not-italic relative shrink-0 text-[#989898] text-[14px]">e.g. John</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute h-[14.002px] left-[436.01px] top-[17px] w-[20px]" data-name="Paragraph">
      <p className="absolute font-normal leading-[14px] left-0 not-italic text-[10px] text-black top-0 w-[20px] whitespace-pre-wrap">0/12</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute h-[47.995px] left-0 top-0 w-[468.004px]" data-name="Container">
      <TextInput />
      <Paragraph3 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute h-[47.995px] left-0 overflow-clip rounded-[4px] top-0 w-[468.004px]" data-name="Container">
      <Container23 />
    </div>
  );
}

function Container24() {
  return <div className="absolute border-[#ebebeb] border-[0.556px] border-solid h-[47.995px] left-0 rounded-[4px] top-0 w-[468.004px]" data-name="Container" />;
}

function Container21() {
  return (
    <div className="absolute h-[47.995px] left-0 rounded-[4px] top-[26px] w-[468.004px]" data-name="Container">
      <Container22 />
      <Container24 />
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute h-[73.993px] left-[16px] top-[512.33px] w-[468.004px]" data-name="Container">
      <Container20 />
      <Container21 />
    </div>
  );
}

function Container26() {
  return <div className="absolute border-[#1e1e1e] border-b-[0.556px] border-solid h-[18.003px] left-0 top-0 w-[50.46px]" data-name="Container" />;
}

function Paragraph4() {
  return (
    <div className="absolute h-[18.003px] left-0 top-0 w-[50.46px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[25.5px] not-italic text-[#1e1e1e] text-[14px] text-center top-[-0.11px]">Cancel</p>
    </div>
  );
}

function Button5() {
  return (
    <div className="absolute h-[18.003px] left-0 top-[16px] w-[50.46px]" data-name="Button">
      <Container26 />
      <Paragraph4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="absolute h-[18.003px] left-[23.99px] top-[16px] w-[89.297px]" data-name="Paragraph">
      <p className="-translate-x-1/2 absolute font-semibold leading-[18px] left-[45px] not-italic text-[14px] text-center text-white top-[-0.11px] tracking-[0.14px] uppercase">save photo</p>
    </div>
  );
}

function Button6() {
  return (
    <div className="absolute bg-[#aeaeae] h-[50px] left-0 top-0 w-[137.283px]" data-name="Button">
      <Paragraph5 />
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute h-[50px] left-[330.72px] top-0 w-[137.283px]" data-name="Container">
      <Button6 />
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute h-[50px] left-[16px] top-[610.98px] w-[468.004px]" data-name="Container">
      <Button5 />
      <Container27 />
    </div>
  );
}

function Container4() {
  return (
    <div className="col-[1] h-[681px] justify-self-stretch overflow-clip relative row-[1] self-start shrink-0" data-name="Container">
      <Container5 />
      <Container6 />
      <Container19 />
      <Container25 />
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute bg-white grid grid-cols-[repeat(1,_minmax(0,_1fr))] grid-rows-[repeat(1,_fit-content(100%))] left-[-0.44px] overflow-clip top-[47.83px] w-[500px]" data-name="Container">
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