import Button from "@/components/common/button";
import OrderTypeDropdown from "@/components/common/dropdown/orderTypeDropdown";
import Input from "@/components/common/input";
import PercentageSlider from "@/components/common/input/percentageSlider";
import OrderToggle from "@/components/common/orderToggle";
import {
  OrderToggleEnum,
  OrderTypeEnumDropdown,
} from "@/enum/orderToggle.enum";
import { useState } from "react";

function OrderCreationBox() {
  const [orderType, setOrderType] = useState<OrderToggleEnum>(
    OrderToggleEnum.BUY
  );
  const [orderTypeDropdown, setOrderTypeDropdown] =
    useState<OrderTypeEnumDropdown>(OrderTypeEnumDropdown.LIMIT);
  const [amount, setAmount] = useState<number>(-Infinity);
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value) || -Infinity);
  };
  return (
    <div className="  w-full">
      <OrderToggle orderType={orderType} setOrderType={setOrderType} />
      <OrderTypeDropdown
        orderTypeDropdown={orderTypeDropdown}
        setOrderTypeDropdown={setOrderTypeDropdown}
        className="mt-2"
      />
      <div>
        <div className="flex items-center justify-between mt-[10px] ">
          <p className="text-[12px] font-[500] leading-4 tracking-[0.12px] text-[#000000] underline">
            Available to Trade
          </p>

          <p className="text-[12px] font-[500] leading-4 tracking-[0.12px] text-[#000000]">
            0.00 USDC
          </p>
        </div>
        <Input
          placeholder="Price (USD)"
          value={amount}
          onChange={handleAmountChange}
          inputType="number"
          className="mt-[8px]"
          rightElement={
            <p className="text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000] flex items-center gap-x-1">
              <span>34.5</span>
              <span className="underline">Mid</span>
            </p>
          }
        />

        <Input
          placeholder="Shares"
          value={amount}
          onChange={handleAmountChange}
          inputType="number"
          className="mt-[8px]"
          rightElement={
            <p className="text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000]/40 flex items-center gap-x-1">
              <span>0</span>
            </p>
          }
        />
        <PercentageSlider className="mt-[8px]" />
        <div className="w-full h-[4px] bg-[#ECECEC] mt-[13px]  mb-[8px]" />
        <div className="flex items-center justify-between text-[12px] font-[500] text-[#000000]  leading-[16px] tracking-[0.12px] ">
          <p>Order Total</p>
          <p>$0</p>
        </div>
        <div className="mt-[10px] flex items-center justify-between text-[12px] font-[500] text-[#000000]  leading-[16px] tracking-[0.12px] ">
          <p>To Win 💵</p>
          <p>$0</p>
        </div>
        <div className="w-full mt-[12px]">
          <Button title="BUY/LONG CSK" isFullWidth />
        </div>
      </div>
    </div>
  );
}

export default OrderCreationBox;
