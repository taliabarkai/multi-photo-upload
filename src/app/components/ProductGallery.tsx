import { useState, type CSSProperties } from "react";
import imgA from "@/assets/00c52dc224b39e87ede8c5a565dc1f823fa3c534.png";
import imgB from "@/assets/e1ac1851720ccef9e33cd729bb12e7b41dba6ef9.png";
import imgC from "@/assets/53b75d7d8a38dff05063ba48c9363e05cb16df0e.png";

const DESKTOP_SLIDES: { img1: string; img2: string }[] = [
  { img1: imgA, img2: imgB },
  { img1: imgC, img2: imgA },
  { img1: imgB, img2: imgC },
];

const MOBILE_SLIDES = [imgA, imgB, imgC];

function AspectRatioLock() {
  return <div className="h-0 w-full" />;
}

function Component21FixedAspectRatioSpacer() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative shrink-0 w-full">
      <div className="flex h-[206.693px] items-center justify-center relative shrink-0 w-full" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "0" } as CSSProperties}>
        <div className="-rotate-30 flex-none w-full">
          <AspectRatioLock />
        </div>
      </div>
    </div>
  );
}

function FixedAspectRatioSpacerVariants({ img1, img2 }: { img1: string; img2: string }) {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px relative lg:aspect-square">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute bg-[#f8b4e4] inset-0" />
        <img alt="" className="absolute max-w-none object-cover size-full" src={img1} />
      </div>
      <Component21FixedAspectRatioSpacer />
      <Component21FixedAspectRatioSpacer />
    </div>
  );
}

function DesktopImagesRow({ img1, img2 }: { img1: string; img2: string }) {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full pr-[0px] pb-[0px] pl-[0px] p-[0px]">
      <FixedAspectRatioSpacerVariants img1={img1} img2={img1} />
      <FixedAspectRatioSpacerVariants img1={img2} img2={img2} />
    </div>
  );
}

export default function ProductGallery() {
  const [page, setPage] = useState(0);

  return (
    <div className="bg-white content-stretch flex flex-col gap-[8px] items-start max-w-[1400px] min-h-px min-w-px overflow-clip p-[0px] pt-[0px] pr-[0px] pl-[0px] w-full">
      {/* Desktop: full grid */}
      <div className="hidden min-[992px]:contents">
        {DESKTOP_SLIDES.map((slide, i) => (
          <DesktopImagesRow key={i} img1={slide.img1} img2={slide.img2} />
        ))}
      </div>

      {/* Mobile: single square image, full width, no padding */}
      <div className="min-[992px]:hidden w-full flex flex-col">
        <div className="relative w-full aspect-square overflow-hidden bg-white">
          <img
            src={MOBILE_SLIDES[page]}
            alt=""
            className="absolute inset-0 size-full max-w-none object-cover"
          />
        </div>
        <div className="flex gap-[6px] items-center justify-center w-full py-[8px]" role="tablist" aria-label="Gallery pages">
          {MOBILE_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={page === i}
              aria-label={`Gallery image ${i + 1} of ${MOBILE_SLIDES.length}`}
              onClick={() => setPage(i)}
              className={`rounded-full shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                page === i ? "size-[8px] bg-black" : "size-[7px] bg-[#BEBEBE]"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
