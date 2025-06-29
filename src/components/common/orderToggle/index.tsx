import { OrderToggleEnum } from "@/enum/orderToggle.enum";

function OrderToggle({
  orderType,
  setOrderType,
}: {
  orderType: OrderToggleEnum;
  setOrderType: (orderType: OrderToggleEnum) => void;
}) {
  return (
    <div className="relative w-full flex bg-[#F5F5F5] border border-[#E9E9E9] rounded-[4px] px-[2px] py-[2px]">
      <div
        className={`absolute top-[2px] left-[2px] h-[calc(100%-4px)] w-1/2 rounded-[2px] bg-[#2B2B2B] transition-all duration-300 ease-in-out  ${
          orderType === OrderToggleEnum.SELL
            ? "translate-x-full"
            : "translate-x-0"
        }`}
      />

      <button
        className={`relative z-10 flex-1 py-[6px] text-[12px] font-[500] leading-[20px] tracking-[0.12px] rounded-[2px] transition-colors duration-200 hover:opacity-70 ${
          orderType === OrderToggleEnum.BUY ? "text-white" : "text-black/50"
        }`}
        onClick={() => setOrderType(OrderToggleEnum.BUY)}
      >
        <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
          BUY/LONG
        </span>
      </button>
      <button
        className={`relative z-10 flex-1 py-[6px] text-[12px] font-[500] leading-[20px] tracking-[0.12px] rounded-[2px] transition-colors duration-200 hover:opacity-70 ${
          orderType === OrderToggleEnum.SELL ? "text-white" : "text-black/50"
        }`}
        onClick={() => setOrderType(OrderToggleEnum.SELL)}
      >
        <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
          SELL/SHORT
        </span>
      </button>
    </div>
  );
}

export default OrderToggle;
