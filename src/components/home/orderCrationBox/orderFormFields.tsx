import Input from "@/components/common/input";
import PercentageSlider from "@/components/common/input/percentageSlider";
import {
  OrderTypeEnumDropdown,
  OrderToggleEnum,
} from "@/enum/orderToggle.enum";
import { dollartoCent } from "@/utility/convertor";

interface OrderFormFieldsProps {
  priceAmount: number;
  sharesAmount: string;
  percentage: number;
  priceError: boolean;
  quantityError: boolean;
  validatePrice: boolean;
  currentAssetPrice: number;
  orderType: OrderToggleEnum;
  orderTypeDropdown: OrderTypeEnumDropdown;
  onPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSharesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPercentageChange: (value: number) => void;
}

function OrderFormFields({
  priceAmount,
  sharesAmount,
  percentage,
  priceError,
  quantityError,
  validatePrice,
  currentAssetPrice,
  orderType,
  orderTypeDropdown,
  onPriceChange,
  onSharesChange,
  onPercentageChange,
}: OrderFormFieldsProps) {
  const isMarketOrder = orderTypeDropdown === OrderTypeEnumDropdown.MARKET;
  const pricePlaceholder = isMarketOrder ? "Market Price" : "Price (USD)";

  return (
    <>
      <Input
        placeholder={pricePlaceholder}
        value={priceAmount}
        onChange={onPriceChange}
        inputType="number"
        disabled={isMarketOrder}
        className={`mt-[8px] ${
          priceError || (!validatePrice && priceAmount !== -Infinity)
            ? "border-red-500 border-2"
            : ""
        } ${isMarketOrder ? "bg-gray-100 cursor-not-allowed" : ""}`}
        rightElement={
          <p className="text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000] flex items-center gap-x-1">
            <span>{dollartoCent(currentAssetPrice)}</span>
            <span className="underline">Mid</span>
          </p>
        }
      />
      {priceError && orderTypeDropdown === OrderTypeEnumDropdown.LIMIT && (
        <p className="text-red-500 text-[10px] mt-1">
          {orderType === OrderToggleEnum.BUY
            ? `Limit price must be below current price (${dollartoCent(
                currentAssetPrice
              )})`
            : `Limit price must be above current price (${dollartoCent(
                currentAssetPrice
              )})`}
        </p>
      )}
      {!validatePrice && priceAmount !== -Infinity && !isMarketOrder && (
        <p className="text-red-500 text-[10px] mt-1">
          Please enter a valid price greater than 0
        </p>
      )}

      <Input
        placeholder="Shares"
        value={sharesAmount}
        onChange={onSharesChange}
        inputType="text"
        className={`mt-[8px] ${quantityError ? "border-red-500 border-2" : ""}`}
        rightElement={
          <p className="text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000]/40 flex items-center gap-x-1">
            <span>CSK</span>
          </p>
        }
      />
      {quantityError && (
        <p className="text-red-500 text-[10px] mt-1">
          Please enter a valid quantity greater than 0
        </p>
      )}

      <PercentageSlider
        className="mt-[8px]"
        value={percentage}
        onChange={onPercentageChange}
      />
    </>
  );
}

export default OrderFormFields;
