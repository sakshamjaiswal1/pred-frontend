import { ConfigProvider, Slider } from "antd";

interface PercentageSliderProps {
  className?: string;
  value: number;
  onChange: (value: number) => void;
}

const PercentageSlider = ({
  className = "",
  value,
  onChange,
}: PercentageSliderProps) => {
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
            value={value}
            onChange={onChange}
            tooltip={{ open: false }}
            marks={{
              25: " ",
              50: " ",
              75: " ",
            }}
          />
        </div>

        {/* Value Box */}
        <div
          className={`min-w-[48px]  px-2 py-[10px] bg-[#f5f5f5] border-[1px] border-solid border-[#E9E9E9] text-[12px] font-medium rounded-[4px] text-center leading-[16px] tracking-[0.12px] ${
            value > 0 ? "text-[#000000]" : "text-[#000000]/40"
          }`}
        >
          {value} %
        </div>
      </div>
    </ConfigProvider>
  );
};

export default PercentageSlider;
