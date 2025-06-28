import { BidOfferTypeEnum } from "@/enum/orderToggle.enum";
import BidOfferItem from "./bidOfferItem";

function BidOfferBox() {
  const buyBid = new Array(5)?.fill(5);
  const sellBid = new Array(5)?.fill(5);

  return (
    <section>
      <div className="flex items-center justify-between text-[#000000]/70 text-[12px] font-[500] leading-[16px] tracking-[0.12px] ">
        <p>Price</p>
        <p>Shares (CSK)</p>
      </div>
      <div className="w-full flex flex-col gap-y-[2px] mt-[10px]">
        {buyBid?.map((item, index) => (
          <BidOfferItem
            key={index}
            type={BidOfferTypeEnum?.BUY}
            totalValue={100}
            currentValue={Math?.random() * 100}
            displayPrice="38¢"
          />
        ))}
        <div className="w-full flex items-center justify-between my-[7px]">
          <p className="text-[14px] font-[600] leading-[20px] tracking-[0.14px] text-[#000000]">
            34.5¢
          </p>
          <p className="text-[10px] font-[500] leading-[20px] tracking-[0.1px]">
            (Spread 1%)
          </p>
        </div>
        {sellBid?.map((item, index) => (
          <BidOfferItem
            key={index}
            type={BidOfferTypeEnum?.SELL}
            totalValue={100}
            currentValue={Math?.random() * 100}
            displayPrice="38¢"
          />
        ))}
      </div>
    </section>
  );
}

export default BidOfferBox;
