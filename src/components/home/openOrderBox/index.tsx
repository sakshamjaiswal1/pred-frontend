import ButtonSecondary from "@/components/common/button/buttonSecondary";
import CheckboxCustom from "@/components/common/checkbox";
import ProgressBar from "@/components/common/progressBar";


import { useState } from "react";

function OpenOrders() {
  const [isChecked, setIschecked] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setIschecked((prevState) => !prevState);
  };

  return (
    <section>
      <div className="flex items-center justify-between py-[12px] px-[24px] border-b-[1px] border-solid border-[#E9E9E9]">
        <div className="flex items-center gap-x-[6px]">
          <CheckboxCustom
            id="close-order"
            checked={isChecked}
            onChange={toggleCheckbox}
          />
          <label
            htmlFor="close-order"
            className={`text-[12px] font-[500] tracking-[0.12px] cursor-pointer select-none transition-all duration-300 ease-in-out transform hover:scale-105 ${
              isChecked
                ? "text-[#000000] hover:text-[#2B2B2B]"
                : "text-[#858585] hover:text-[#000000]"
            }`}
          >
            Hide Other Pairs
          </label>
        </div>
        <ButtonSecondary title="Cancel All" />
      </div>
      <div className="px-[24px] pt-[24px]">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[14px] font-[500] leading-[16px] tracking-[0.14px]">
              CSK / IPL Winner
            </p>
            <div className="flex items-center gap-x-[4px] mt-[2px] text-[10px] font-[400] leading-[16px] tracking-[0.1]">
              <p className="text-[#56AB68] ">Limit /Buy</p>{" "}
              <p className="text-[#858585]">2025-06-03 14:57:23</p>
            </div>
          </div>
          <div className="flex items-start gap-x-[12px]">
            <div>
              <p className="text-center text-[12px] font-[500] tracking-[0.12px]">
                20%
              </p>
              <ProgressBar totalSpots={100} filledSpots={20} />
            </div>
            <ButtonSecondary title="Cancel" />
          </div>
        </div>
        <div className=" mt-2  ">
          <div className="flex items-center justify-between text-[10px] font-[400] leading-[16px]">
            <p className="text-[#3B3B3B] ">Filled / Amount</p>
            <p>
              {" "}
              <span className="text-[#000]">0.00 / </span>{" "}
              <span className="text-[#858585]">0.01</span>{" "}
            </p>
          </div>
        </div>
        <div className="  ">
          <div className="flex items-center justify-between text-[10px] font-[400] leading-[16px]">
            <p className="text-[#3B3B3B] ">Price</p>
            <p>
              {" "}
              <span className="text-[#000]">30¢</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OpenOrders;
