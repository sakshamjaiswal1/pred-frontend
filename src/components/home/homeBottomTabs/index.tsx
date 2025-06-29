import { HomeBottomTabsEnum } from "@/enum/orderToggle.enum";

function HomeBottomTabs({
  currentHomeTab,
  setCurrentHomeTab,
}: {
  currentHomeTab: HomeBottomTabsEnum;
  setCurrentHomeTab: (tab: HomeBottomTabsEnum) => void;
}) {
  const allTabs = [
    HomeBottomTabsEnum?.OPEN_ORDERS,
    HomeBottomTabsEnum?.POSITIONS,
    HomeBottomTabsEnum?.TRADE_HISTORY,
  ];

  return (
    <div className="w-full border-[1px] border-solid border-[#E9E9E9] px-[24px]">
      <div className="flex items-center gap-x-[16px] py-[8px]">
        {allTabs?.map((item, index) => (
          <button
            className={`relative text-[12px] font-[500] leading-[16px] tracking-[0.12px] py-[8px] px-[4px] transition-all duration-300 ease-in-out transform hover:scale-105 ${
              item === currentHomeTab
                ? "text-[#000000]"
                : "text-[#000000]/40 hover:text-[#000000]/60"
            }`}
            type="button"
            onClick={() => setCurrentHomeTab(item)}
            key={item}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomeBottomTabs;
