import { BidOfferTypeEnum } from "@/enum/orderToggle.enum";
import { useMemo } from "react";

function BidOfferItem({
  type,
  currentValue,
  totalValue,
  displayPrice,
}: {
  type: BidOfferTypeEnum;
  totalValue: number;
  currentValue: number;
  displayPrice: string;
}) {
  const displayWidth = useMemo(() => {
    const percent = Math.ceil((currentValue * 100) / totalValue);
    return percent;
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        className={`absolute  h-[22px] ${
          type === BidOfferTypeEnum?.BUY ? "bg-[#A90022]/10" : "bg-[#06A900]/10"
        }`}
        style={{ width: `${displayWidth}%` }}
      />
      <div className="w-full flex items-center justify-between text-[12px] font-[500] leading-[16px] tracking-[0.12] py-[3px] text-[#000000]/60">
        <p>{displayPrice}</p>
        <p>{Math?.ceil(currentValue)}</p>
      </div>
    </div>
  );
}

export default BidOfferItem;
