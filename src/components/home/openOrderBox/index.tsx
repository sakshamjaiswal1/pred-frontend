import ButtonSecondary from "@/components/common/button/buttonSecondary";
import CheckboxCustom from "@/components/common/checkbox";

import { useState } from "react";

function OpenOrders() {
  const [isChecked, setIschecked] = useState<boolean>(false);

  const toggleCheckbox = () => {
    setIschecked((prevState) => !prevState);
  };

  return (
    <section>
      <div className="flex items-center justify-between py-[10px] px-[24px]">
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
    </section>
  );
}

export default OpenOrders;
