function SectionTitle() {
  return (
    <div className="content-stretch flex items-center py-[5px] relative shrink-0" data-name="Section Title 2">
      <div aria-hidden="true" className="absolute border-b-2 border-black border-solid inset-0 pointer-events-none" />
      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black uppercase whitespace-nowrap">
        <p className="leading-[22px]">The story behind it</p>
      </div>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <SectionTitle />
    </div>
  );
}

function SectionTitle1() {
  return (
    <div className="content-stretch flex items-center py-[5px] relative shrink-0" data-name="Section Title 2">
      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black uppercase whitespace-nowrap">
        <p className="leading-[22px]">Instructions</p>
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <SectionTitle1 />
    </div>
  );
}

function SectionTitle2() {
  return (
    <div className="content-stretch flex items-center py-[5px] relative shrink-0" data-name="Section Title 2">
      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black uppercase whitespace-nowrap">
        <p className="leading-[22px]">Details</p>
      </div>
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <SectionTitle2 />
    </div>
  );
}

function SectionTitle3() {
  return (
    <div className="content-stretch flex items-center py-[5px] relative shrink-0" data-name="Section Title 2">
      <div className="flex flex-col font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-black uppercase whitespace-nowrap">
        <p className="leading-[22px]">Shipping</p>
      </div>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <SectionTitle3 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[30px] items-start pb-[40px] relative shrink-0">
      <Frame />
      <Frame3 />
      <Frame4 />
      <Frame5 />
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col h-[25px] items-start py-[5px] relative shrink-0" data-name="Link">
      <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black" dir="auto">
        Show More
      </p>
      <div className="h-0 relative shrink-0 w-full">
        <div className="absolute inset-[-1.5px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 78 1.5">
            <line id="Line 50" stroke="var(--stroke-0, black)" strokeWidth="1.5" x2="78" y1="0.75" y2="0.75" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[24px] items-start min-h-px min-w-px relative">
      <div className="font-normal leading-[18px] min-w-full not-italic relative shrink-0 text-[14px] text-black w-[min-content] whitespace-pre-wrap">
        <p className="mb-0" dir="auto">
          We love name necklaces so much we created a name necklace where you can have more than one name on the chain - the Multiple Name Necklace in 18k Gold Vermeil. You can provide up to five names on this necklace! Wear your favorite inspirational words, common nicknames you go by, or family members you want to keep close to you. The possibilities are endless. Get one for yourself and one for someone you know who is sure to love it!
          <br aria-hidden="true" />
          <br aria-hidden="true" />
        </p>
        <p dir="auto">This necklace is made out of 18k Gold Vermeil and hangs on a Rollo Chain. Visit name necklaces to view more designs</p>
      </div>
      <Link />
    </div>
  );
}

function Row() {
  return (
    <div className="content-stretch flex gap-[60px] items-start justify-center relative shrink-0 w-full max-w-[1440px] mx-auto" data-name="Row 2">
      <Frame2 />
      <Frame1 />
    </div>
  );
}

export default function Row3Description() {
  return (
    <div className="bg-[#f2eeeb] content-stretch flex flex-col items-start px-[240px] py-[60px] relative w-full" data-name="Row 3 - Description">
      <Row />
    </div>
  );
}