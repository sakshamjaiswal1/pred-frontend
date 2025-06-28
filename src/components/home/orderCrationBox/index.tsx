import Button from "@/components/common/button";
import OrderTypeDropdown from "@/components/common/dropdown/orderTypeDropdown";
import OrderToggle from "@/components/common/orderToggle";
import { OrderToggleEnum } from "@/enum/orderToggle.enum";
import { useOrderForm } from "@/hooks/useOrderForm";
import OrderFormFields from "./orderFormFields";
import OrderSummary from "./orderSummary";

function OrderCreationBox() {
  const {
    orderType,
    setOrderType,
    orderTypeDropdown,
    setOrderTypeDropdown,
    priceAmount,
    sharesAmount,
    percentage,
    priceError,
    quantityError,
    submitError,
    validatePrice,
    userBalance,
    currentAssetPrice,
    calculations,
    handlePriceChange,
    handleSharesChange,
    handlePercentageChange,
    handleSubmitOrder,
  } = useOrderForm();

  return (
    <div className="w-full">
      <OrderToggle orderType={orderType} setOrderType={setOrderType} />
      <OrderTypeDropdown
        orderTypeDropdown={orderTypeDropdown}
        setOrderTypeDropdown={setOrderTypeDropdown}
        className="mt-2"
      />
      <div>
        <div className="flex items-center justify-between mt-[10px]">
          <p className="text-[12px] font-[500] leading-4 tracking-[0.12px] text-[#000000] underline">
            Available to Trade
          </p>
          <p className="text-[12px] font-[500] leading-4 tracking-[0.12px] text-[#000000]">
            ${userBalance.toFixed(2)} USDC
          </p>
        </div>

        <OrderFormFields
          priceAmount={priceAmount}
          sharesAmount={sharesAmount}
          percentage={percentage}
          priceError={priceError}
          quantityError={quantityError}
          validatePrice={validatePrice}
          currentAssetPrice={currentAssetPrice}
          orderType={orderType}
          orderTypeDropdown={orderTypeDropdown}
          onPriceChange={handlePriceChange}
          onSharesChange={handleSharesChange}
          onPercentageChange={handlePercentageChange}
        />

        <OrderSummary
          orderTotal={calculations.orderTotal}
          potentialWin={calculations.potentialWin}
          submitError={submitError}
        />

        <div className="w-full mt-[12px]">
          <Button
            title={
              orderType === OrderToggleEnum.BUY
                ? "BUY/LONG CSK"
                : "SELL/SHORT CSK"
            }
            isFullWidth
            onClick={handleSubmitOrder}
          />
        </div>
      </div>
    </div>
  );
}

export default OrderCreationBox;
