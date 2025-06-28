import { IPositionData } from "@/interface/common.interface";
import ShareIcon from "@/assets/home/share.svg?react";
import ButtonSecondary from "@/components/common/button/buttonSecondary";

interface PositionItemProps extends IPositionData {
  onClose?: () => void;
}

function PositionItem({
  type,
  pnlColor,
  roiColor,
  sizePercentageColor,
  symbol,
  pnl,
  size,
  entryPrice,
  margin,
  markPrice,
  roi,
  sizePercentage,
  lastSize,
  onClose,
}: PositionItemProps) {
  const iconBgColor = type === "B" ? "bg-green-500" : "bg-red-500";
  const pnlTextColor = pnlColor === "green" ? "text-green-500" : "text-red-500";
  const roiTextColor = roiColor === "green" ? "text-green-500" : "text-red-500";
  const sizePercentageTextColor =
    sizePercentageColor === "green"
      ? "text-green-500"
      : sizePercentageColor === "red"
      ? "text-red-500"
      : "text-gray-400";

  return (
    <div className="p-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
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
            <p className={`text-[18px] font-[600] ${pnlTextColor}`}>{pnl}</p>
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
            <p className="text-[14px] text-[#000]">{margin}</p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">
              Mark Price (USDC)
            </p>
            <p className="text-[14px] text-[#000]">{markPrice}</p>
          </div>
        </div>

        <div className="space-y-[16px]">
          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">ROI</p>
            <p className={`text-[18px] font-[600] ${roiTextColor}`}>{roi}</p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Size (CSK)</p>
            <p className={`text-[14px] ${sizePercentageTextColor}`}>
              {sizePercentage}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#666] mb-[4px]">Size (CSK)</p>
            <p className="text-[14px] text-[#666]">{lastSize}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PositionItem;
