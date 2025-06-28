import TopBar from "@/components/home/topbar";
import cskLogo from "@/assets/home/csklogo.png";
import OrderCreationBox from "@/components/home/orderCrationBox";
import BidOfferBox from "@/components/home/bidOfferBox";
import { HomeBottomTabsEnum } from "@/enum/orderToggle.enum";
import { useEffect, useMemo, useState } from "react";
import HomeBottomTabs from "@/components/home/homeBottomTabs";
import OpenOrders from "@/components/home/openOrderBox";
import TradeHistoryBox from "@/components/home/tradeHistoryBox";
import PositionBox from "@/components/home/positionBox";
import { useGlobalData } from "@/hooks/useGlobalData";
import { dollartoCent } from "@/utility/convertor";

function Home() {
  const [currentHomeTab, setCurrentHomeTab] = useState<HomeBottomTabsEnum>(
    HomeBottomTabsEnum?.OPEN_ORDERS
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayTab, setDisplayTab] = useState<HomeBottomTabsEnum>(
    HomeBottomTabsEnum?.OPEN_ORDERS
  );

  const { currentAssetPrice } = useGlobalData();

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
        percentChange={0.84}
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
          setCurrentHomeTab={setCurrentHomeTab}
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
