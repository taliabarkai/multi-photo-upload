import svgPaths from "./svg-re7xj2kvp6";
import imgProductCardImage from "figma:asset/39d37e89fe84a3923cade05f352206ea725781d8.png";
import imgProductCardImage1 from "figma:asset/ece298d0ec2c16f10310d45724b276a6035cb503.png";
import imgContainer from "figma:asset/b2219f0fd37438192a88a2f73765c7155e55bc26.png";
import imgContainer1 from "figma:asset/3d3a06c1a4aa5a0efd37eb8e175314c641cbea42.png";
import imgColor from "figma:asset/c46b6316b65611a074bd90ed3bb7fa4597fc24b0.png";
import imgColor1 from "figma:asset/331a4d25f1e91a36bf5feec86759e97b221aa786.png";
import imgColor2 from "figma:asset/c4c0b2f50bd41b7a746cdf17313403f852def132.png";
import imgColor3 from "figma:asset/3ba45ac921e3690d772ef2aa7fc6bec36dea4a40.png";

function Hamburger() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Hamburger">
      <div className="absolute inset-[14.29%_0_80.36%_0]" style={{ backgroundImage: "linear-gradient(90deg, rgb(31, 31, 31) 0%, rgb(31, 31, 31) 100%), linear-gradient(90deg, rgb(27, 28, 30) 0%, rgb(27, 28, 30) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }} />
      <div className="absolute inset-[46.43%_0_48.21%_0]" style={{ backgroundImage: "linear-gradient(90deg, rgb(31, 31, 31) 0%, rgb(31, 31, 31) 100%), linear-gradient(90deg, rgb(27, 28, 30) 0%, rgb(27, 28, 30) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }} />
      <div className="absolute inset-[78.57%_0_16.07%_0]" style={{ backgroundImage: "linear-gradient(90deg, rgb(31, 31, 31) 0%, rgb(31, 31, 31) 100%), linear-gradient(90deg, rgb(27, 28, 30) 0%, rgb(27, 28, 30) 100%), linear-gradient(90deg, rgb(0, 0, 0) 0%, rgb(0, 0, 0) 100%)" }} />
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Search">
          <g id="Path 81">
            <mask fill="black" height="21" id="path-1-outside-1_1_45669" maskUnits="userSpaceOnUse" width="21" x="1" y="1">
              <rect fill="white" height="21" width="21" x="1" y="1" />
              <path d={svgPaths.p25a6f180} />
            </mask>
            <path d={svgPaths.p25a6f180} fill="black" />
            <path d={svgPaths.p14c6070} fill="var(--stroke-0, black)" mask="url(#path-1-outside-1_1_45669)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center min-h-px min-w-px relative" data-name="Icons">
      <Hamburger />
      <Search />
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[20.433px] relative shrink-0 w-[131.701px]" data-name="Logo">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 131.701 20.4328">
        <g clipPath="url(#clip0_1_38513)" id="Logo">
          <g id="Vector">
            <path clipRule="evenodd" d={svgPaths.pb9aad00} fill="var(--fill-0, black)" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p29abde00} fill="var(--fill-0, black)" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_1_38513">
            <rect fill="white" height="20.4328" width="131.701" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Logo1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo 8">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Logo 8">
          <g id="Union">
            <path d={svgPaths.p32a4d900} fill="var(--fill-0, black)" />
            <path d={svgPaths.p32a4d900} fill="var(--fill-1, #1B1C1E)" />
            <path d={svgPaths.p32a4d900} fill="var(--fill-2, #1F1F1F)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Logo 9">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Logo 9">
          <g id="Path 68">
            <mask fill="black" height="21" id="path-1-outside-1_1_29560" maskUnits="userSpaceOnUse" width="22" x="1.1935" y="1.16526">
              <rect fill="white" height="21" width="22" x="1.1935" y="1.16526" />
              <path d={svgPaths.p39845030} />
            </mask>
            <path d={svgPaths.p39845030} fill="black" />
            <path d={svgPaths.p37987700} fill="var(--stroke-0, black)" mask="url(#path-1-outside-1_1_29560)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icons1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] h-full items-center justify-end min-h-px min-w-px relative" data-name="Icons">
      <Logo1 />
      <Logo2 />
    </div>
  );
}

function HeaderMb() {
  return (
    <div className="bg-white h-[56px] shrink-0 sticky top-0 w-full" data-name="Header MB">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[12px] relative size-full">
          <Icons />
          <Logo />
          <Icons1 />
        </div>
      </div>
    </div>
  );
}

function ProductCardImage() {
  return (
    <div className="overflow-clip relative shrink-0 size-[375px]" data-name="Product Card image">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgProductCardImage} />
        <img alt="" className="absolute max-w-none object-cover opacity-20 size-full" src={imgProductCardImage1} />
      </div>
    </div>
  );
}

function Pagination1() {
  return (
    <div className="content-stretch flex gap-[6px] items-center justify-center pb-[8px] relative shrink-0 w-[47px]" data-name="Pagination">
      <div className="relative shrink-0 size-[8px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 8">
          <g id="Ellipse 53">
            <circle cx="4" cy="4" fill="var(--fill-0, black)" r="4" />
            <circle cx="4" cy="4" fill="var(--fill-1, #1B1C1E)" r="4" />
            <circle cx="4" cy="4" fill="var(--fill-2, #1F1F1F)" r="4" />
          </g>
        </svg>
      </div>
      <div className="relative shrink-0 size-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <circle cx="3.5" cy="3.5" fill="var(--fill-0, #BEBEBE)" id="Ellipse 54" r="3.5" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <circle cx="3.5" cy="3.5" fill="var(--fill-0, #BEBEBE)" id="Ellipse 54" r="3.5" />
        </svg>
      </div>
      <div className="relative shrink-0 size-[7px]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 7">
          <circle cx="3.5" cy="3.5" fill="var(--fill-0, #BEBEBE)" id="Ellipse 54" r="3.5" />
        </svg>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Chevron">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Chevron">
          <path clipRule="evenodd" d={svgPaths.p9945e80} fill="var(--fill-0, black)" fillRule="evenodd" id="Rectangle 1 (Stroke)" />
        </g>
      </svg>
    </div>
  );
}

function Breadcrumbs() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Breadcrumbs">
      <p className="font-normal leading-[16px] relative shrink-0 text-[#1f1f1f] text-[12px] tracking-[0.24px]">Home</p>
      <Chevron />
      <p className="font-normal leading-[16px] relative shrink-0 text-[#1f1f1f] text-[12px] tracking-[0.24px]">Category</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="col-1 content-stretch flex gap-[12px] items-center ml-0 mt-0 relative row-1">
      <p className="font-semibold leading-[28px] not-italic relative shrink-0 text-[24px] text-black uppercase">$140</p>
    </div>
  );
}

function Group() {
  return (
    <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid items-[start] justify-items-[start] leading-[0] relative shrink-0">
      <Frame />
    </div>
  );
}

function Pricing() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="Pricing">
      <p className="font-semibold leading-[28px] max-w-[400px] min-w-full not-italic relative shrink-0 text-[24px] text-black uppercase w-[min-content] whitespace-pre-wrap">Music Memories Custom Canvas</p>
      <Group />
    </div>
  );
}

function FullStar() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Full-Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Full-Star">
          <path d={svgPaths.p3f313570} fill="var(--fill-0, #E8FF36)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function FullStar1() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Full-Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Full-Star">
          <path d={svgPaths.p3f313570} fill="var(--fill-0, #E8FF36)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function FullStar2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Full-Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Full-Star">
          <path d={svgPaths.p3f313570} fill="var(--fill-0, #E8FF36)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function FullStar3() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Full-Star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Full-Star">
          <path d={svgPaths.p3f313570} fill="var(--fill-0, #E8FF36)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Preview() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Preview">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Preview">
          <path d={svgPaths.p5e9a240} fill="var(--fill-0, #989898)" id="Vector" />
          <g id="Mask group">
            <mask height="18" id="mask0_1_37614" maskUnits="userSpaceOnUse" style={{ maskType: "alpha" }} width="18" x="1" y="1">
              <path d={svgPaths.p5e9a240} fill="var(--fill-0, black)" id="Vector_2" />
            </mask>
            <g mask="url(#mask0_1_37614)">
              <rect fill="var(--fill-0, #E8FF36)" height="21.1111" id="Rectangle 1246" width="11.1111" x="-1.11108" y="-2.2222" />
            </g>
          </g>
          <path d={svgPaths.p26f60a00} id="Vector_3" stroke="var(--stroke-0, black)" strokeWidth="0.5" />
        </g>
      </svg>
    </div>
  );
}

function Stars() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Stars">
      <FullStar />
      <FullStar1 />
      <FullStar2 />
      <FullStar3 />
      <Preview />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Link">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[14px] text-black" dir="auto">
        123 Reviews
      </p>
    </div>
  );
}

function Reviews() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Reviews">
      <Stars />
      <div className="flex flex-col font-semibold justify-end leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="leading-[18px]">4.8</p>
      </div>
      <Link />
    </div>
  );
}

function DescriptionSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[24px] relative shrink-0 w-full" data-name="Description Section">
      <div aria-hidden="true" className="absolute border-[#ebebeb] border-b border-solid inset-0 pointer-events-none" />
      <Breadcrumbs />
      <Pricing />
      <Reviews />
    </div>
  );
}

function MainSectionOfProductPage() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[520px] overflow-clip relative shrink-0 w-full" data-name="Main Section of Product Page">
      <DescriptionSection />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <div className="flex flex-col font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
        <p className="leading-[18px]">Add your Names or a Special Date</p>
      </div>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-normal justify-center leading-[0] relative shrink-0 text-[16px] text-black whitespace-nowrap">
        <p className="leading-[22px]">Guide Link</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-start relative shrink-0">
      <Frame6 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full">
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function InputFieldFloatingLabelLal() {
  return (
    <div className="bg-white h-[48px] min-h-[48px] relative rounded-[8px] shrink-0 w-full" data-name="Input field - floating label LAL 2">
      <div className="flex flex-row items-center min-h-[inherit] overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center min-h-[inherit] px-[12px] py-[8px] relative size-full">
          <p className="flex-[1_0_0] font-normal leading-[18px] min-h-px min-w-px not-italic relative text-[#989898] text-[14px] whitespace-pre-wrap">{`e.g. Ava & Liam, 10.22.2021`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e3e3e3] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function InputField() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Input field">
      <Frame5 />
      <InputFieldFloatingLabelLal />
    </div>
  );
}

function Iec() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="IEC">
      <InputField />
    </div>
  );
}

function MainSectionOfProductPage1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[520px] overflow-clip py-[16px] relative shrink-0 w-full" data-name="Main Section of Product Page">
      <Iec />
    </div>
  );
}

function Container1() {
  return (
    <div className="h-[21.997px] relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-center justify-between not-italic relative size-full text-[14px]">
        <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-black whitespace-nowrap">
          <p className="leading-[18px]">Upload your photos:</p>
        </div>
        <p className="leading-[18px] relative shrink-0 text-[#666]">3/3 uploaded</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10.008px] left-[calc(50%+0.13px)] top-[calc(50%+0.13px)] w-[11.12px]" data-name="Icon">
      <div className="absolute inset-[-5.55%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.231 11.1189">
          <g id="Icon">
            <path d={svgPaths.p2b16fc00} fill="var(--fill-0, #F36641)" id="Vector" stroke="var(--stroke-0, #F36641)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            <g id="Vector_2">
              <path d="M6.121 3.89659V6.11881Z" fill="var(--fill-0, white)" />
              <path d="M6.121 3.89659V6.11881" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
            <g id="Vector_3">
              <path d="M6.121 8.34102H6.12586Z" fill="var(--fill-0, white)" />
              <path d="M6.121 8.34102H6.12586" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function PhotoWarning() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PhotoWarning">
      <Icon />
    </div>
  );
}

function Frame9() {
  return (
    <div className="absolute content-stretch flex items-center left-[4px] top-[4px]">
      <PhotoWarning />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[2.778px] relative rounded-[4px] shrink-0 size-[72px]" data-name="Container">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[4px] size-full" src={imgContainer} />
      <Frame9 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.997px] items-start min-h-px min-w-px not-italic relative" data-name="Container">
      <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Photo 1</p>
      <p className="font-normal leading-[16px] relative shrink-0 text-[#989898] text-[12px] w-[164px] whitespace-pre-wrap">Name: John</p>
    </div>
  );
}

function Frame12() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black text-center">Edit</p>
    </div>
  );
}

function Close() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Close">
          <path d={svgPaths.p3afaf600} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[328.46px] rounded-[18641400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[20px] top-[-2px]" data-name="Button">
      <Close />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-[345px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
        <Container3 />
        <Container4 />
        <Frame12 />
        <Button />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10.008px] left-[calc(50%+0.13px)] top-[calc(50%+0.13px)] w-[11.12px]" data-name="Icon">
      <div className="absolute inset-[-5.55%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.231 11.1189">
          <g id="Icon">
            <path d={svgPaths.p2b16fc00} fill="var(--fill-0, #F36641)" id="Vector" stroke="var(--stroke-0, #F36641)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            <g id="Vector_2">
              <path d="M6.121 3.89659V6.11881Z" fill="var(--fill-0, white)" />
              <path d="M6.121 3.89659V6.11881" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
            <g id="Vector_3">
              <path d="M6.121 8.34102H6.12586Z" fill="var(--fill-0, white)" />
              <path d="M6.121 8.34102H6.12586" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function PhotoWarning1() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PhotoWarning">
      <Icon1 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="absolute content-stretch flex items-center left-[4px] top-[4px]">
      <PhotoWarning1 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[2.778px] relative rounded-[4px] shrink-0 size-[72px]" data-name="Container">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[4px]">
        <img alt="" className="absolute max-w-none object-cover rounded-[4px] size-full" src={imgContainer} />
        <div className="absolute inset-0 overflow-hidden rounded-[4px]">
          <img alt="" className="absolute h-[203.71%] left-[-18.87%] max-w-none top-[-2.35%] w-[285.11%]" src={imgContainer1} />
        </div>
      </div>
      <Frame10 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.997px] items-start min-h-px min-w-px not-italic relative" data-name="Container">
      <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Photo 2</p>
      <p className="font-normal leading-[16px] relative shrink-0 text-[#989898] text-[12px] w-[164px] whitespace-pre-wrap">Name: Natalie</p>
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black text-center">Edit</p>
    </div>
  );
}

function Close1() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Close">
          <path d={svgPaths.p3afaf600} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[328.46px] rounded-[18641400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[20px] top-[-2px]" data-name="Button">
      <Close1 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-[345px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
        <Container6 />
        <Container7 />
        <Frame13 />
        <Button1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[10.008px] left-[calc(50%+0.13px)] top-[calc(50%+0.13px)] w-[11.12px]" data-name="Icon">
      <div className="absolute inset-[-5.55%_-5%]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12.231 11.1189">
          <g id="Icon">
            <path d={svgPaths.p2b16fc00} fill="var(--fill-0, #F36641)" id="Vector" stroke="var(--stroke-0, #F36641)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            <g id="Vector_2">
              <path d="M6.121 3.89659V6.11881Z" fill="var(--fill-0, white)" />
              <path d="M6.121 3.89659V6.11881" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
            <g id="Vector_3">
              <path d="M6.121 8.34102H6.12586Z" fill="var(--fill-0, white)" />
              <path d="M6.121 8.34102H6.12586" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.11111" />
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}

function PhotoWarning2() {
  return (
    <div className="overflow-clip relative shrink-0 size-[16px]" data-name="PhotoWarning">
      <Icon2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="absolute content-stretch flex items-center left-[4px] top-[4px]">
      <PhotoWarning2 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-clip p-[2.778px] relative rounded-[4px] shrink-0 size-[72px]" data-name="Container">
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[4px]">
        <img alt="" className="absolute h-full left-[-156.81%] max-w-none top-0 w-[256.41%]" src={imgContainer} />
      </div>
      <Frame11 />
    </div>
  );
}

function Container10() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[1.997px] items-start min-h-px min-w-px not-italic relative" data-name="Container">
      <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Photo 3</p>
      <p className="font-normal leading-[16px] relative shrink-0 text-[#989898] text-[12px] w-[164px] whitespace-pre-wrap">Name: Natalie</p>
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0">
      <div aria-hidden="true" className="absolute border-b border-black border-solid inset-0 pointer-events-none" />
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black text-center">Edit</p>
    </div>
  );
}

function Close2() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Close">
          <path d={svgPaths.p3afaf600} fill="var(--fill-0, #1E1E1E)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="absolute bg-white content-stretch flex items-center justify-center left-[328.46px] rounded-[18641400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[20px] top-[-2px]" data-name="Button">
      <Close2 />
    </div>
  );
}

function Container8() {
  return (
    <div className="relative rounded-[4px] shrink-0 w-[345px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#ebebeb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[24px] items-center pl-[8px] pr-[12px] py-[8px] relative w-full">
        <Container9 />
        <Container10 />
        <Frame14 />
        <Button2 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Container1 />
      <Container2 />
      <Container5 />
      <Container8 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex font-normal gap-[8px] items-start leading-[0] not-italic relative shrink-0 text-[14px] text-black whitespace-nowrap">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[18px]">Upgrade to a premium look:</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[18px]">Canvas</p>
      </div>
    </div>
  );
}

function Materials() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Materials">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[48px] top-1/2" data-name="Frame">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 48 48">
          <circle cx="24" cy="24" fill="var(--fill-0, white)" id="Frame" r="23.2727" stroke="var(--stroke-0, black)" strokeWidth="1.45455" />
        </svg>
      </div>
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42.667px] top-1/2" data-name="Color">
        <img alt="" className="block max-w-none size-full" height="42.667" src={imgColor} width="42.667" />
      </div>
    </div>
  );
}

function LargeMaterial() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Large material">
      <Materials />
    </div>
  );
}

function Materials1() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Materials">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42.667px] top-1/2" data-name="Color">
        <img alt="" className="block max-w-none size-full" height="42.667" src={imgColor1} width="42.667" />
      </div>
    </div>
  );
}

function LargeMaterial1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Large material">
      <Materials1 />
    </div>
  );
}

function Materials2() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Materials">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42.667px] top-1/2" data-name="Color">
        <img alt="" className="block max-w-none size-full" height="42.667" src={imgColor2} width="42.667" />
      </div>
    </div>
  );
}

function LargeMaterial2() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Large material">
      <Materials2 />
    </div>
  );
}

function Materials3() {
  return (
    <div className="relative shrink-0 size-[48px]" data-name="Materials">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[42.667px] top-1/2" data-name="Color">
        <img alt="" className="block max-w-none size-full" height="42.667" src={imgColor3} width="42.667" />
      </div>
    </div>
  );
}

function LargeMaterial3() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center relative shrink-0" data-name="Large material">
      <Materials3 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0 w-[375px]">
      <LargeMaterial />
      <LargeMaterial1 />
      <LargeMaterial2 />
      <LargeMaterial3 />
    </div>
  );
}

function DtPremium() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start justify-center relative shrink-0 w-full" data-name="DT premium">
      <Frame4 />
      <Frame1 />
    </div>
  );
}

function Iec1() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start justify-center relative shrink-0 w-full" data-name="IEC">
      <DtPremium />
    </div>
  );
}

function MainSectionOfProductPage2() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[520px] overflow-clip relative shrink-0 w-full" data-name="Main Section of Product Page">
      <Iec1 />
    </div>
  );
}

function Component() {
  return (
    <div className="content-stretch flex font-semibold items-start justify-between leading-[28px] not-italic relative shrink-0 text-[24px] text-black uppercase w-full" data-name="Component 21">
      <p className="relative shrink-0">Subtotal:</p>
      <p className="relative shrink-0">$260</p>
    </div>
  );
}

function Cta() {
  return (
    <div className="bg-[#e8ff36] h-[50px] relative shrink-0 w-full" data-name="CTA">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
          <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black tracking-[0.14px] uppercase">add to bag</p>
        </div>
      </div>
    </div>
  );
}

function MainSectionOfProductPage3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[520px] overflow-clip relative shrink-0 w-full" data-name="Main Section of Product Page">
      <Component />
      <Cta />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-center relative shrink-0 w-full">
      <Container />
      <MainSectionOfProductPage2 />
      <MainSectionOfProductPage3 />
    </div>
  );
}

function Pagination() {
  return (
    <div className="relative shrink-0 w-full" data-name="Pagination">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col items-center px-[16px] py-[20px] relative w-full">
          <Pagination1 />
          <MainSectionOfProductPage />
          <MainSectionOfProductPage1 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-[376px]">
      <ProductCardImage />
      <Pagination />
    </div>
  );
}

export default function ImagesWithPersonalization() {
  return (
    <div className="content-stretch flex flex-col items-start relative size-full" data-name="Images with personalization">
      <HeaderMb />
      <Frame8 />
    </div>
  );
}