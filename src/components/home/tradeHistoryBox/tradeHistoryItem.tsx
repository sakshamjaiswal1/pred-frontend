import { ITradeHistoryData } from "@/interface/common.interface";

interface TradeHistoryItemProps {
  data: ITradeHistoryData;
}

function TradeHistoryItem({ data }: TradeHistoryItemProps) {
  const iconBgColor = data.type === "B" ? "bg-green-500" : "bg-red-500";
  const orderTypeColor = data.type === "B" ? "text-green-500" : "text-red-500";
  const pnlTextColor =
    data.pnlColor === "green" ? "text-green-500" : "text-red-500";

  return (
    <div className="p-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
      <div className="flex items-center justify-between mb-[16px]">
        <div className="flex items-center gap-[8px]">
          <div
            className={`w-[24px] h-[24px] ${iconBgColor} rounded flex items-center justify-center`}
          >
            <span className="text-[#fff] text-[12px] font-[700]">
              {data.type}
            </span>
          </div>
          <span className="font-[600] text-[16px] text-[#000]">
            {data.symbol}
          </span>
        </div>

        <div className="text-right">
          <p className="text-[12px] text-[#666]">{data.dateTime}</p>
        </div>
      </div>

      <div className="mb-[16px]">
        <span className={`text-[14px] font-[500] ${orderTypeColor}`}>
          {data.orderType}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-[16px]">
        <div className="space-y-[12px]">
          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Order No.</span>
            <span className="text-[12px] text-[#000]">{data.orderNo}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Price</span>
            <span className="text-[12px] text-[#000]">{data.price}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Filled (USDC)</span>
            <span className="text-[12px] text-[#000]">{data.filled}</span>
          </div>
        </div>

        <div className="space-y-[12px]">
          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Fee (USDC)</span>
            <span className="text-[12px] text-[#000]">{data.fee}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Role</span>
            <span className="text-[12px] text-[#000]">{data.role}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[12px] text-[#666]">Realized PNL (USDC)</span>
            <span className={`text-[12px] font-[500] ${pnlTextColor}`}>
              {data.realizedPNL}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeHistoryItem;
