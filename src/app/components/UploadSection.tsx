import svgPaths from "../../imports/svg-8vdd84l1h8";

interface UploadSectionProps {
  uploadedCount: number;
  totalPhotos: number;
  onUploadClick: () => void;
}

export default function UploadSection({ uploadedCount, totalPhotos, onUploadClick }: UploadSectionProps) {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="h-[21.997px] relative shrink-0 w-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex font-normal items-center justify-between not-italic relative size-full text-[14px]">
          <div className="flex flex-col justify-center leading-[0] relative shrink-0 text-black whitespace-nowrap">
            <p className="leading-[18px]">Upload your photos:</p>
          </div>
          <p className="leading-[18px] relative shrink-0 text-[#666]">{uploadedCount}/{totalPhotos} uploaded</p>
        </div>
      </div>

      <button
        onClick={onUploadClick}
        className="relative rounded-[4px] shrink-0 w-full group/uploadSection"
      >
        <div
          aria-hidden="true"
          className="absolute border border-[#E3E3E3] border-solid inset-0 pointer-events-none rounded-[4px] transition-colors min-[992px]:group-hover/uploadSection:border-black"
        />
        <div className="flex flex-row items-center size-full">
          <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[16px] items-center p-[9px] relative w-full">
            <div className="bg-[#f5f5f5] relative rounded-[3.6px] shrink-0 size-[72px] border border-[#E3E3E3] border-solid">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
                <div className="relative shrink-0 size-[32px]">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
                    <div className="absolute inset-[12.5%_12.49%_12.5%_12.51%]">
                      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                        <g id="Frame">
                          <path d={svgPaths.pbc71b00} fill="var(--fill-0, black)" id="Vector" stroke="var(--stroke-0, black)" strokeWidth="0.216" />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="h-[38.003px] relative shrink-0 w-[231.684px]">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[4px] items-start not-italic relative size-full">
                <p className="font-semibold leading-[18px] relative shrink-0 text-[14px] text-black">Upload Multiple Photos at Once</p>
                <p className="font-normal leading-[16px] relative shrink-0 text-[#666] text-[12px]">Select up to {totalPhotos} photos from your device</p>
              </div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}
