import PositionItem from "./positionItem";

function PositionBox() {
  const sellPositionData = {
    symbol: "CSK",
    type: "S" as const,
    pnl: "+221.65",
    pnlColor: "green" as const,
    roi: "+91.61%",
    roiColor: "green" as const,
    size: "1.3520",
    margin: "1.3520",
    entryPrice: "0.01650",
    markPrice: "0.010252",
    sizePercentage: "6.15%",
    sizePercentageColor: "green" as const,
    lastSize: "---",
  };

  const buyPositionData = {
    symbol: "CSK",
    type: "B" as const,
    pnl: "+221.65",
    pnlColor: "green" as const,
    roi: "+91.61%",
    roiColor: "green" as const,
    size: "1.3520",
    margin: "1.3520",
    entryPrice: "0.01650",
    markPrice: "0.010252",
    sizePercentage: "6.15%",
    sizePercentageColor: "green" as const,
    lastSize: "---",
  };

  return (
    <div>
      <PositionItem {...buyPositionData} />
      <PositionItem {...sellPositionData} />
    </div>
  );
}

export default PositionBox;
