function Button() {
  return (
    <div className="bg-black relative rounded-[100px] shrink-0 size-[23.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[3.993px] relative size-full">
        <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[14px] text-center text-white">1</p>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#ebebeb] relative rounded-[100px] shrink-0 size-[23.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[3.993px] relative size-full">
        <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-center">2</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#ebebeb] relative rounded-[100px] shrink-0 size-[23.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[3.993px] relative size-full">
        <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-center">3</p>
      </div>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#ebebeb] relative rounded-[100px] shrink-0 size-[23.993px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center justify-center px-[3.993px] relative size-full">
        <p className="font-normal leading-[18px] not-italic relative shrink-0 text-[#1e1e1e] text-[14px] text-center">4</p>
      </div>
    </div>
  );
}

export default function Container() {
  return (
    <div className="content-stretch flex gap-[24px] items-center justify-center relative size-full" data-name="Container">
      <Button />
      <Button1 />
      <Button2 />
      <Button3 />
      <div className="-translate-x-1/2 absolute h-0 left-1/2 top-[12.5px] w-[126px]">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 126 1">
            <line id="Line 78" stroke="var(--stroke-0, #EBEBEB)" x2="126" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}