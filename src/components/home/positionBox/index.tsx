import PositionItem from "./positionItem";
import { usePositions } from "@/hooks/usePositions";
import { useTradeHistory } from "@/hooks/useTradeHistory";
import { useGlobalData } from "@/hooks/useGlobalData";
import { useToast } from "@/contexts/ToastContext";
import { IPositionData } from "@/interface/common.interface";

function PositionBox() {
  const { positions, removePositionItem } = usePositions();
  const { addTrade } = useTradeHistory();
  const { currentAssetPrice } = useGlobalData();
  const { showToast } = useToast();

  const addTradeHistoryEntry = (
    position: IPositionData,
    showNotification: boolean = true
  ) => {
    const entryPriceNum = parseFloat(position.entryPrice);
    const currentPriceNum = currentAssetPrice;
    const sizeNum = parseFloat(position.size);

    const priceDifference =
      position.type === "B"
        ? currentPriceNum - entryPriceNum
        : entryPriceNum - currentPriceNum;

    const finalPnl = priceDifference * sizeNum;

    const formattedPnl =
      finalPnl >= 0 ? `+${finalPnl.toFixed(2)}` : finalPnl.toFixed(2);
    const pnlColor: "green" | "red" = finalPnl >= 0 ? "green" : "red";

    // Create trade history entry
    const tradeEntry = {
      symbol: position.symbol,
      type: position.type,
      orderType: position.type === "B" ? ("Buy" as const) : ("Sell" as const),
      dateTime: new Date().toLocaleString(),
      orderNo: `TRD${Date.now()}`,
      price: currentAssetPrice.toFixed(5),
      filled: position.size,
      fee: (parseFloat(position.size) * currentAssetPrice * 0.001).toFixed(5), // 0.1% fee
      role: "Taker",
      realizedPNL: formattedPnl,
      pnlColor: pnlColor,
    };

    addTrade(tradeEntry);

    if (showNotification) {
      const typeText = position.type === "B" ? "Buy" : "Sell";
      showToast(
        `${typeText} position closed with P&L: ${formattedPnl} USDC`,
        pnlColor === "green" ? "success" : "error",
        4000
      );
    }
  };

  const handleClosePosition = (id: string) => {
    // Find the position to get its details for trade history
    const position = positions.find((pos) => pos.id === id);
    if (position) {
      addTradeHistoryEntry(position);
    }
    removePositionItem(id);
  };

  return (
    <section>
      <div className="flex items-center justify-between py-[12px] px-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
        <div className="flex items-center gap-x-[8px]">
          <span className="text-[12px] font-[500] text-[#666]">
            Symbol / PNL / ROI
          </span>
        </div>
      </div>

      {positions.map((position, index) => (
        <div key={`${position.id}-${index}`}>
          <PositionItem
            {...position}
            onClose={() => handleClosePosition(position.id)}
          />
        </div>
      ))}

      {positions.length === 0 && (
        <div className="p-[24px] text-center text-[#666] text-[14px]">
          No positions available
        </div>
      )}
    </section>
  );
}

export default PositionBox;
