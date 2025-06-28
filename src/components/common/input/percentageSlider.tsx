import { ConfigProvider, Slider } from "antd";
import { SetStateAction, useState } from "react";

const PercentageSlider = ({ className = "" }) => {
  const [sliderValue, setSliderValue] = useState(0);

  const handleChange = (val: SetStateAction<number>) => {
    setSliderValue(val);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            trackBg: "#404040",
            trackHoverBg: "#404040",
            railBg: "#E0E0E0",
            railHoverBg: "#E0E0E0",

            handleSize: 8,

            dotSize: 8,

            railSize: 2,
            dotActiveBorderColor: "#404040",
            dotBorderColor: "#404040",
            handleActiveColor: "#404040",
            handleActiveOutlineColor: "#D9D9D9",
            handleColor: "#404040",
            handleSizeHover: 12,
          },
        },
      }}
    >
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Slider */}
        <div className="flex-1">
          <Slider
            min={0}
            max={100}
            value={sliderValue}
            onChange={handleChange}
            tooltip={{ open: false }}
            marks={{
              25: " ",
              50: " ",
              75: " ",
            }}
          />
        </div>

        {/* Value Box */}
        <div className="min-w-[48px]  px-2 py-[10px] bg-[#f5f5f5] border-[1px] border-solid border-[#E9E9E9] text-[12px] font-medium text-[#000000]/40 rounded-[4px] text-center leading-[16px] tracking-[0.12px] ">
          {sliderValue} %
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PercentageSlider;
