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

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    let nextIndex = index;

    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        nextIndex = index > 0 ? index - 1 : allTabs.length - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        nextIndex = index < allTabs.length - 1 ? index + 1 : 0;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        setCurrentHomeTab(allTabs[index]);
        return;
      default:
        return;
    }

    // Focus next tab and set it as current
    const nextTab = document.querySelector(
      `[data-tab-index="${nextIndex}"]`
    ) as HTMLElement;
    if (nextTab) {
      nextTab.focus();
      setCurrentHomeTab(allTabs[nextIndex]);
    }
  };

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
            onKeyDown={(e) => handleKeyDown(e, index)}
            data-tab-index={index}
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
