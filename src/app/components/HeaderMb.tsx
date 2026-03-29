import svgPaths from "../../imports/svg-8vdd84l1h8";

function Hamburger() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Hamburger">
      <div className="absolute inset-[-2.78%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 16">
          <path d="M0 2H23M0 8H23M0 14H23" stroke="black" />
        </svg>
      </div>
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

export default function HeaderMb() {
  return (
    <div className="bg-white h-[56px] shrink-0 sticky top-0 w-full z-10" data-name="Header MB">
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