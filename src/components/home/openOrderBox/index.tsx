import ButtonSecondary from "@/components/common/button/buttonSecondary";
import CheckboxCustom from "@/components/common/checkbox";
import { useState } from "react";
import OpenOrderItem from "./openOrderItem";
import { useOpenOrders } from "@/hooks/useOpenOrders";

function OpenOrders() {
  const [isChecked, setIschecked] = useState<boolean>(false);
  const { orders, removeOrder, clearAllOrders } = useOpenOrders();

  const toggleCheckbox = () => {
    setIschecked((prevState) => !prevState);
  };

  const handleCancelOrder = (orderNo: string) => {
    removeOrder(orderNo);
  };

  const handleCancelAll = () => {
    clearAllOrders();
  };

  const filteredOrders = isChecked
    ? orders.filter((order) => order.symbol.includes("CSK"))
    : orders;

  return (
    <section>
      <div className="flex items-center justify-between py-[12px] px-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
        <div className="flex items-center gap-x-[6px]">
          <CheckboxCustom
            id="close-order"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <label
            htmlFor="close-order"
            className={`text-[12px] font-[500] tracking-[0.12px] cursor-pointer select-none transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isChecked
                ? "text-[#000000] hover:text-[#2B2B2B]"
                : "text-[#858585] hover:text-[#000000]"
            }`}
          >
            Hide Other Teams
          </label>
        </div>
        <ButtonSecondary title="Cancel All" onClick={handleCancelAll} />
      </div>

      {filteredOrders.map((order) => (
        <div
          key={order.orderNo}
          className="px-[24px] pt-[24px] border-b-[1px] border-solid border-[#E9E9E9] last:border-b-0"
        >
          <OpenOrderItem data={order} onCancel={handleCancelOrder} />
        </div>
      ))}

      {filteredOrders.length === 0 && (
        <div className="p-[24px] text-center text-[#666] text-[14px]">
          {isChecked ? "No CSK orders found" : "No open orders"}
        </div>
      )}
    </section>
  );
}

export default OpenOrders;
