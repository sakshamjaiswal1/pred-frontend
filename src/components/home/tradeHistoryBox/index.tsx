import { useTradeHistory } from "@/hooks/useTradeHistory";
import TradeHistoryItem from "./tradeHistoryItem";

function TradeHistoryBox({}: {}) {
  const { trades } = useTradeHistory();

  return (
    <div className="">
      {trades.map((trade) => (
        <TradeHistoryItem key={trade.orderNo} data={trade} />
      ))}

      {trades.length === 0 && (
        <div className="p-[24px] text-center text-[#666] text-[14px]">
          No trade history available
        </div>
      )}
    </div>
  );
}

export default TradeHistoryBox;
