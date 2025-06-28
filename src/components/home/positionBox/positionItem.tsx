import { IPositionData } from "@/interface/common.interface";
import ShareIcon from "@/assets/home/share.svg?react";
import ButtonSecondary from "@/components/common/button/buttonSecondary";
import { useGlobalData } from "@/hooks/useGlobalData";

interface PositionItemProps extends IPositionData {
  onClose?: () => void;
}

function PositionItem({
  type,
  sizePercentageColor,
  symbol,
  size,
  entryPrice,
  margin,

  sizePercentage,
  onClose,
}: PositionItemProps) {
  const iconBgColor = type === "B" ? "bg-green-500" : "bg-red-500";

  // Get current asset price from global state
  const { currentAssetPrice } = useGlobalData();

  const entryPriceNum = parseFloat(entryPrice);
  const currentPriceNum = currentAssetPrice; // Use live price from global state
  const sizeNum = parseFloat(size);
  const marginNum = parseFloat(margin);

  const priceDifference =
    type === "B"
      ? currentPriceNum - entryPriceNum
      : entryPriceNum - currentPriceNum;

  const calculatedPnl = priceDifference * sizeNum;
  const calculatedRoi = marginNum > 0 ? (calculatedPnl / marginNum) * 100 : 0;

  const dynamicPnlColor =
    calculatedPnl >= 0 ? "text-green-500" : "text-red-500";
  const dynamicRoiColor =
    calculatedRoi >= 0 ? "text-green-500" : "text-red-500";

  const formattedPnl =
    calculatedPnl >= 0
      ? `+${calculatedPnl.toFixed(2)}`
      : calculatedPnl.toFixed(2);
  const formattedRoi =
    calculatedRoi >= 0
      ? `+${calculatedRoi.toFixed(2)}%`
      : `${calculatedRoi.toFixed(2)}%`;

  const sizePercentageTextColor =
    sizePercentageColor === "green"
      ? "text-green-500"
      : sizePercentageColor === "red"
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div className="px-[24px] py-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center gap-[8px]">
          <div
            className={`w-[24px] h-[24px] ${iconBgColor} rounded flex items-center justify-center`}
          >
            <span className="text-[#fff] text-[12px] font-[700]">{type}</span>
          </div>
          <span className="font-[600] text-[16px] text-[#000]">{symbol}</span>
        </div>

        <div className="flex items-center gap-[8px]">
          <button className="p-[4px] hover:bg-gray-100 rounded">
            <ShareIcon className="h-[16px] w-[16px]" />
          </button>
          {onClose && <ButtonSecondary title="Close" onClick={onClose} />}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-[24px]">
        <div className="space-y-[16px]">
          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">PNL (USDC)</p>
            <p className={`text-[18px] font-[600] ${dynamicPnlColor}`}>
              {formattedPnl}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Size (CSK)</p>
            <p className="text-[14px] text-[#000]">{size}</p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">
              Entry Price (USDC)
            </p>
            <p className="text-[14px] text-[#000]">{entryPrice}</p>
          </div>
        </div>

        <div className="space-y-[16px]">
          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Margin (USDC)</p>
            <p className="text-[18px] text-[#000]">{margin}</p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">
              Mark Price (USDC)
            </p>
            <p className="text-[14px] text-[#000]">
              {currentAssetPrice.toFixed(5)}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Change (CSK)</p>
            <p className={`text-[14px] ${sizePercentageTextColor}`}>
              {sizePercentage}
            </p>
          </div>
        </div>

        <div className="space-y-[16px]">
          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">ROI</p>
            <p className={`text-[18px] font-[600] ${dynamicRoiColor}`}>
              {formattedRoi}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Size % (CSK)</p>
            <p className={`text-[14px] ${sizePercentageTextColor}`}>
              {sizePercentage}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Status</p>
            <p className="text-[14px] text-[#666]">Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PositionItem;
