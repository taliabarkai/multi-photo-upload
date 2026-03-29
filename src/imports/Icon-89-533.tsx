import svgPaths from "./svg-0xchj0srrh";

function DragIndicatorFilled() {
  return (
    <div className="absolute inset-[16.67%_29.17%]" data-name="DragIndicatorFilled">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.99711 15.9954">
        <g id="DragIndicatorFilled">
          <path d={svgPaths.p27c1f400} fill="var(--fill-0, black)" fillOpacity="0.56" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

export default function Icon() {
  return (
    <div className="relative size-full" data-name="Icon">
      <DragIndicatorFilled />
    </div>
  );
}