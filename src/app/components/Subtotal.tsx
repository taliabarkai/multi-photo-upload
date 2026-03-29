import Frame1320 from '../../imports/Frame1320';

interface SubtotalProps {
  onAddToBag?: () => void;
  /** When true, Add to Bag is disabled (e.g. while uploads are in progress). */
  addToBagDisabled?: boolean;
}

export default function Subtotal({ onAddToBag, addToBagDisabled = false }: SubtotalProps) {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start max-w-[520px] overflow-clip relative shrink-0 w-full">
      <button 
        type="button"
        disabled={addToBagDisabled}
        onClick={onAddToBag}
        className={`bg-[#e8ff36] transition-colors h-[50px] relative shrink-0 w-full ${
          addToBagDisabled
            ? 'opacity-40 cursor-not-allowed'
            : 'cursor-pointer min-[992px]:hover:bg-[#DBF50E]'
        }`}
      >
        <div className="flex flex-row items-center justify-center size-full">
          <div className="content-stretch flex items-center justify-center px-[24px] py-[12px] relative size-full">
            <p className="font-semibold leading-[18px] not-italic relative shrink-0 text-[14px] text-black tracking-[0.14px] uppercase">add to bag - $260</p>
          </div>
        </div>
      </button>
      
      {/* Benefits Section */}
      <div className="w-full p-[0px]">
        <Frame1320 />
      </div>
    </div>
  );
}