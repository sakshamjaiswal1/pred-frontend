import TopBar from "@/components/home/topbar";
import cskLogo from "@/assets/home/csklogo.png";
import OrderCreationBox from "@/components/home/orderCrationBox";
import BidOfferBox from "@/components/home/bidOfferBox";
import { HomeBottomTabsEnum } from "@/enum/orderToggle.enum";
import { useEffect, useMemo, useState, useRef } from "react";
import HomeBottomTabs from "@/components/home/homeBottomTabs";
import OpenOrders from "@/components/home/openOrderBox";
import TradeHistoryBox from "@/components/home/tradeHistoryBox";
import PositionBox from "@/components/home/positionBox";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useUIState } from "@/hooks/useUIState";
import { dollartoCent } from "@/utility/convertor";

function Home() {
  const { currentHomeTab, updateCurrentHomeTab } = useUIState();
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTab, setDisplayTab] =
    useState<HomeBottomTabsEnum>(currentHomeTab);

  const { currentAssetPrice, updateCurrentAssetPrice } = useGlobalData();
  const priceDirection = useRef<"up" | "down">("up");
  const currentPrice = useRef(0.2);
  const stepCounter = useRef(0);

  const priceChangeData = useMemo(() => {
    const referencePrice = 0.5;
    const percentChange =
      ((currentAssetPrice - referencePrice) / referencePrice) * 100;
    const isPositive = percentChange >= 0;

    return {
      percentage: Math.round(percentChange).toString(),
      isPositive,
      color: isPositive ? "#06A900" : "#A90022",
    };
  }, [currentAssetPrice]);

  useEffect(() => {
    const priceInterval = setInterval(() => {
      if (priceDirection.current === "up") {
        if (stepCounter.current < 2) {
          currentPrice.current += 0.01;
          stepCounter.current++;
        } else {
          currentPrice.current -= 0.01;
          stepCounter.current = 0;
        }

        if (currentPrice.current >= 1.2) {
          priceDirection.current = "down";
          stepCounter.current = 0;
        }
      } else {
        if (stepCounter.current < 2) {
          currentPrice.current -= 0.01;
          stepCounter.current++;
        } else {
          currentPrice.current += 0.01;
          stepCounter.current = 0;
        }

        if (currentPrice.current <= 0.2) {
          priceDirection.current = "up";
          stepCounter.current = 0;
        }
      }

      const roundedPrice = Math.round(currentPrice.current * 100) / 100;
      updateCurrentAssetPrice(roundedPrice);
    }, 500);

    return () => clearInterval(priceInterval);
  }, [updateCurrentAssetPrice]);

  const currentDisplayTab = useMemo(() => {
    switch (displayTab) {
      case HomeBottomTabsEnum.OPEN_ORDERS:
        return <OpenOrders />;
      case HomeBottomTabsEnum.POSITIONS:
        return <PositionBox />;
      case HomeBottomTabsEnum.TRADE_HISTORY:
        return <TradeHistoryBox />;
      default:
        return <OpenOrders />;
    }
  }, [displayTab]);

  useEffect(() => {
    if (currentHomeTab !== displayTab) {
      setIsAnimating(true);

      const timer = setTimeout(() => {
        setDisplayTab(currentHomeTab);
        setIsAnimating(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [currentHomeTab, displayTab]);

  return (
    <div>
      <TopBar
        title="Chennai Super Kings"
        volume="$65.2M Vol."
        percentChange={priceChangeData.percentage}
        percentChangeColor={priceChangeData.color}
        logoUrl={cskLogo}
        price={dollartoCent(currentAssetPrice, true) as string}
      />
      <div className="mt-[23px] flex items-start gap-x-[16px] px-[24px]">
        <OrderCreationBox />
        <div className="min-w-[134px]">
          <BidOfferBox />
        </div>
      </div>
      <div className="mt-[24px]">
        <HomeBottomTabs
          currentHomeTab={currentHomeTab}
          setCurrentHomeTab={updateCurrentHomeTab}
        />
        <div
          className={`transition-opacity duration-300 ease-in-out ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentDisplayTab}
        </div>
      </div>
    </div>
  );
}

export default Home;
