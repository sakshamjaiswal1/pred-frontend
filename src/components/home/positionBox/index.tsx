import PositionItem from "./positionItem";
import ButtonSecondary from "@/components/common/button/buttonSecondary";
import { usePositions } from "@/hooks/usePositions";

function PositionBox() {
  const { positions, clearAllPositions, removePositionItem } = usePositions();

  const handleCloseAllPositions = () => {
    clearAllPositions();
  };

  const handleClosePosition = (symbol: string, type: "B" | "S") => {
    removePositionItem(symbol, type);
  };

  return (
    <section>
      <div className="flex items-center justify-between py-[12px] px-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
        <div className="flex items-center gap-x-[8px]">
          <span className="text-[12px] font-[500] text-[#666]">
            Symbol / PNL / ROI
          </span>
        </div>
        <ButtonSecondary
          title="Close All Positions"
          onClick={handleCloseAllPositions}
        />
      </div>

      {positions.map((position, index) => (
        <div key={`${position.symbol}-${position.type}-${index}`}>
          <PositionItem
            {...position}
            onClose={() => handleClosePosition(position.symbol, position.type)}
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
