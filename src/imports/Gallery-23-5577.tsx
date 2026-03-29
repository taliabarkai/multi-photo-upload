import img11 from "figma:asset/00c52dc224b39e87ede8c5a565dc1f823fa3c534.png";
import img12 from "figma:asset/e1ac1851720ccef9e33cd729bb12e7b41dba6ef9.png";
import img13 from "figma:asset/22fd1f660849d471f5f308e9e69f7251d6a42fbe.png";
import img14 from "figma:asset/972caa0f1a65c47e2efbdcced7271491347ba44b.png";
import img15 from "figma:asset/4b7d9daea05de7a5fda2d827dd5628a8bb3d3b44.png";
import img16 from "figma:asset/e37834842e9f5f79b6ade72c7738259cfb2c2e2e.png";

function Ribbon() {
  return (
    <div className="absolute bg-[#ebe2de] content-stretch flex items-end left-[16px] p-[8px] top-[16px]" data-name="Ribbon">
      <p className="font-semibold leading-[14px] not-italic relative shrink-0 text-[14px] text-black uppercase">sale</p>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents left-[16px] top-[16px]">
      <Ribbon />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[12.017px] items-center relative shrink-0" data-name="Row 1">
      <div className="relative shrink-0 size-[633.432px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
      <div className="relative shrink-0 size-[633.432px]" data-name="1 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img12} />
      </div>
      <Group />
    </div>
  );
}

function Row2() {
  return (
    <div className="content-stretch flex gap-[12.017px] items-center relative shrink-0" data-name="Row 8">
      <div className="relative shrink-0 size-[633.432px]" data-name="1 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img13} />
      </div>
      <div className="relative shrink-0 size-[633.432px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img14} />
      </div>
    </div>
  );
}

function Row1() {
  return (
    <div className="content-stretch flex gap-[12.017px] items-center relative shrink-0" data-name="Row 7">
      <div className="relative shrink-0 size-[633.432px]" data-name="1 2">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img15} />
      </div>
      <div className="relative shrink-0 size-[633.432px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img16} />
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[12.017px] items-start relative size-full" data-name="GALLERY">
      <Row />
      <Row2 />
      <Row1 />
    </div>
  );
}