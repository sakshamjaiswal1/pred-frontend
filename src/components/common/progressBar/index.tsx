export type IProgressBar = {
  filledSpots: number;
  totalSpots: number;
};

const ProgressBar = ({ filledSpots, totalSpots }: IProgressBar) => {
  return (
    <div className="bg-[#e8def8] w-[45px] h-[4px] overflow-hidden rounded-[4px]">
      <div
        className="bg-[#925fe6] h-full"
        style={{ width: `${(filledSpots * 100) / totalSpots}%` }}
      />
    </div>
  );
};

export default ProgressBar;
