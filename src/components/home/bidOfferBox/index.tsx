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
