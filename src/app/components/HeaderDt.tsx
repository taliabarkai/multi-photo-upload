import svgPaths from '../../imports/svg-evybfy9nu9';

const NAV_ITEMS: { label: string; href: string }[] = [
  { label: 'Home', href: '/' },
  { label: 'Decor', href: '/decor' },
  { label: 'Lifestyle', href: '/lifestyle' },
  { label: 'Best sellers', href: '/best-sellers' },
  { label: 'New', href: '/new' },
  { label: 'Gift guide', href: '/gift-guide' },
  { label: 'Sale', href: '/sale' },
];

function Hamburger() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <div className="absolute inset-[-2.78%_0]">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 23 19">
          <path d="M0 0.5H23M0 9.5H23M0 18.5H23" stroke="black" />
        </svg>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="h-[27.926px] relative shrink-0 w-[180px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 180 27.9262">
        <g clipPath="url(#clip0_9_34963)">
          <g>
            <path clipRule="evenodd" d={svgPaths.p33854500} fill="black" fillRule="evenodd" />
            <path clipRule="evenodd" d={svgPaths.p9707c00} fill="black" fillRule="evenodd" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_9_34963">
            <rect fill="white" height="27.9262" width="180" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export interface HeaderDtProps {
  /** When set, nav items call this instead of default navigation (e.g. guard during upload). */
  onNavigate?: (href: string) => void;
}

function Navigation({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <nav
      className="content-stretch flex font-semibold gap-[32px] items-center justify-center leading-[20px] not-italic relative shrink-0 text-[16px] text-center tracking-[0.064px] uppercase"
      aria-label="Main"
    >
      {NAV_ITEMS.map(({ label, href }) => (
        <button
          key={href + label}
          type="button"
          onClick={() => onNavigate?.(href)}
          className={`relative shrink-0 bg-transparent border-0 p-0 cursor-pointer font-semibold uppercase tracking-[0.064px] ${
            label === 'Sale' ? 'text-[#900603]' : 'text-[#1f1f1f]'
          } hover:opacity-80`}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <g>
            <mask fill="black" height="21" id="path-1-outside-1_9_12684" maskUnits="userSpaceOnUse" width="21" x="1" y="1">
              <rect fill="white" height="21" width="21" x="1" y="1" />
              <path d={svgPaths.p25a6f180} />
            </mask>
            <path d={svgPaths.p25a6f180} fill="black" />
            <path d={svgPaths.p14c6070} fill="black" mask="url(#path-1-outside-1_9_12684)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Account() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <g>
            <path d={svgPaths.p234ea900} fill="black" />
            <path d={svgPaths.p234ea900} fill="#1B1C1E" />
            <path d={svgPaths.p234ea900} fill="#1F1F1F" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ShoppingBag() {
  return (
    <div className="relative shrink-0 size-[24px]">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g>
          <g>
            <mask fill="black" height="21" id="path-1-outside-1_9_72080" maskUnits="userSpaceOnUse" width="22" x="1.1935" y="1.16526">
              <rect fill="white" height="21" width="22" x="1.1935" y="1.16526" />
              <path d={svgPaths.p39845030} />
            </mask>
            <path d={svgPaths.p39845030} fill="black" />
            <path d={svgPaths.p37987700} fill="black" mask="url(#path-1-outside-1_9_72080)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Icons() {
  return (
    <div className="content-stretch flex gap-[8px] items-center justify-end relative shrink-0 lg:w-[140px]">
      {/* Hamburger - only visible below 992px */}
      <div className="lg:hidden">
        <Hamburger />
      </div>
      <Search />
      {/* Account and Shopping Bag - only visible at 992px and above */}
      <div className="hidden lg:block">
        <Account />
      </div>
      <div className="hidden lg:block">
        <ShoppingBag />
      </div>
    </div>
  );
}

export default function HeaderDt({ onNavigate }: HeaderDtProps) {
  return (
    <div className="bg-white content-stretch flex items-center justify-between pointer-events-auto px-[32px] py-[16px] fixed top-0 w-full z-50 border-b border-[#E3E3E3]">
      <Logo />
      <Navigation onNavigate={onNavigate} />
      <Icons />
    </div>
  );
}
