import svgPaths from "./svg-bkftxep4pk";

function Group() {
  return (
    <div className="absolute inset-[20.55%_16.66%_20.55%_16.67%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.3334 11.7817">
        <g id="Group">
          <path clipRule="evenodd" d={svgPaths.p3b43f00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector" />
          <path clipRule="evenodd" d={svgPaths.p34b9ba00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_2" />
          <path clipRule="evenodd" d={svgPaths.p33c20b00} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_3" />
          <path clipRule="evenodd" d={svgPaths.p6018a50} fill="var(--fill-0, #1E1E1E)" fillRule="evenodd" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

export default function Photo() {
  return (
    <div className="relative size-full" data-name="Photo">
      <Group />
    </div>
  );
}