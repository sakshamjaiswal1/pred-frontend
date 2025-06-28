import ButtonSecondary from "@/components/common/button/buttonSecondary";
import ProgressBar from "@/components/common/progressBar";
import { IOpenOrderData } from "@/interface/common.interface";

interface OpenOrderItemProps {
  data: IOpenOrderData;
  onCancel?: (orderNo: string) => void;
}

function OpenOrderItem({ data, onCancel }: OpenOrderItemProps) {
  const orderTypeColor =
    data.type === "B" ? "text-[#56AB68]" : "text-[#FF4444]";

  const handleCancel = () => {
    if (onCancel) {
      onCancel(data.orderNo);
    }
  };

  return (
    <div className="">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[14px] font-[500] leading-[16px] tracking-[0.14px]">
            {data.symbol}
          </p>
          <div className="flex items-center gap-x-[4px] mt-[2px] text-[10px] font-[400] leading-[16px] tracking-[0.1]">
            <p className={orderTypeColor}>Limit /{data.orderType}</p>
            <p className="text-[#858585]">{data.dateTime}</p>
          </div>
        </div>
        <div className="flex items-start gap-x-[12px]">
          <div>
            <p className="text-center text-[12px] font-[500] tracking-[0.12px]">
              {data.percentage}%
            </p>
            <ProgressBar totalSpots={100} filledSpots={data.percentage} />
          </div>
          <ButtonSecondary title="Cancel" onClick={handleCancel} />
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center justify-between text-[10px] font-[400] leading-[16px]">
          <p className="text-[#3B3B3B]">Filled / Amount</p>
          <p>
            <span className="text-[#000]">{data.filled} / </span>
            <span className="text-[#858585]">{data.amount}</span>
          </p>
        </div>
      </div>
      <div className="">
        <div className="flex items-center justify-between text-[10px] font-[400] leading-[16px]">
          <p className="text-[#3B3B3B]">Price</p>
          <p>
            <span className="text-[#000]">{data.price}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default OpenOrderItem;
