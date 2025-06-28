import { BidOfferTypeEnum } from "@/enum/orderToggle.enum";
import BidOfferItem from "./bidOfferItem";
import { useGlobalData } from "@/hooks/useGlobalData";
import { dollartoCent } from "@/utility/convertor";
import { useMemo } from "react";

function BidOfferBox() {
  const { currentAssetPrice } = useGlobalData();

  const currentPriceCents = useMemo(
    () => Math.round(currentAssetPrice * 100),
    [currentAssetPrice]
  );

  const askPrices = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const askCents = currentPriceCents + 2 + index * 2;
        return dollartoCent(askCents / 100, true) as string;
      }),
    [currentPriceCents]
  );

  const bidPrices = useMemo(
    () =>
      Array.from({ length: 5 }, (_, index) => {
        const bidCents = currentPriceCents - 2 - index * 2;
        return dollartoCent(bidCents / 100, true) as string;
      }),
    [currentPriceCents]
  );

  const askVolumes = useMemo(() => {
    const baseTime = Date.now() / 1000;
    const priceInfluence = currentAssetPrice * 10;

    return Array.from({ length: 5 }, (_, index) => {
      const baseVolume = 15 + index * 15;
      const timeVariation = Math.sin(baseTime / 10 + index) * 10;
      const priceVariation = Math.sin(priceInfluence + index) * 8;
      const randomFactor = Math.sin(baseTime / 7 + index * 2) * 5;

      return Math.max(
        5,
        Math.round(baseVolume + timeVariation + priceVariation + randomFactor)
      );
    });
  }, [currentAssetPrice]);

  const bidVolumes = useMemo(() => {
    const baseTime = Date.now() / 1000;
    const priceInfluence = currentAssetPrice * 12;

    return Array.from({ length: 5 }, (_, index) => {
      const baseVolume = 12 + index * 18;
      const timeVariation = Math.cos(baseTime / 8 + index) * 12;
      const priceVariation = Math.cos(priceInfluence + index) * 7;
      const randomFactor = Math.cos(baseTime / 6 + index * 1.5) * 6;

      return Math.max(
        3,
        Math.round(baseVolume + timeVariation + priceVariation + randomFactor)
      );
    });
  }, [currentAssetPrice]);

  const spreadPrice = useMemo(
    () => dollartoCent(currentAssetPrice, true) as string,
    [currentAssetPrice]
  );

  const spreadData = useMemo(() => {
    const bestBidCents = currentPriceCents - 2;
    const bestAskCents = currentPriceCents + 2;
    const spreadCents = bestAskCents - bestBidCents;
    const spreadPercentage = ((spreadCents / currentPriceCents) * 100).toFixed(
      1
    );

    return { spreadPercentage };
  }, [currentPriceCents]);

  return (
    <section>
      <div className="flex items-center justify-between text-[#000000]/70 text-[12px] font-[500] leading-[16px] tracking-[0.12px]">
        <p>Price</p>
        <p>Shares (CSK)</p>
      </div>
      <div className="w-full flex flex-col gap-y-[2px] mt-[10px]">
        {askPrices
          .map((price, index) => (
            <BidOfferItem
              key={`ask-${index}`}
              type={BidOfferTypeEnum?.SELL}
              totalValue={100}
              currentValue={askVolumes[index]}
              displayPrice={price}
            />
          ))
          .reverse()}
        <div className="w-full flex items-center justify-between my-[7px]">
          <p className="text-[14px] font-[600] leading-[20px] tracking-[0.14px] text-[#000000]">
            {spreadPrice}
          </p>
          <p className="text-[10px] font-[500] leading-[20px] tracking-[0.1px]">
            (Spread {spreadData.spreadPercentage}%)
          </p>
        </div>
        {bidPrices.map((price, index) => (
          <BidOfferItem
            key={`bid-${index}`}
            type={BidOfferTypeEnum?.BUY}
            totalValue={100}
            currentValue={bidVolumes[index]}
            displayPrice={price}
          />
        ))}
      </div>
    </section>
  );
}

export default BidOfferBox;
