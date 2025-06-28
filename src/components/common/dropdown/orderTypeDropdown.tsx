import { useState, useRef, useEffect } from "react";
import InfoIcon from "@/assets/dropdown/infoIcon.svg?react";
import DownArrow from "@/assets/dropdown/downArrow.svg?react";
import { OrderTypeEnumDropdown } from "@/enum/orderToggle.enum";

const OrderTypeDropdown = ({
  className = "",
  orderTypeDropdown,
  setOrderTypeDropdown,
}: {
  className?: string;
  orderTypeDropdown: OrderTypeEnumDropdown;
  setOrderTypeDropdown: React.Dispatch<
    React.SetStateAction<OrderTypeEnumDropdown>
  >;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: OrderTypeEnumDropdown.LIMIT, label: "Limit" },
    { value: OrderTypeEnumDropdown.MARKET, label: "Market" },
    { value: OrderTypeEnumDropdown.STOP, label: "Stop" },
  ];

  const selectedOption = options.find(
    (option) => option.value === orderTypeDropdown
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (value: OrderTypeEnumDropdown) => {
    setOrderTypeDropdown(value);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div
        className="rounded border-[1px] border-solid border-[#E9E9E9] bg-[#F5F5F5] px-[6px] py-[4px] flex items-center justify-between cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-[8px] select-none">
          <InfoIcon className="w-4 h-4" />
          <span className="text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000]">
            {selectedOption?.label}
          </span>
        </div>
        <DownArrow
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-[2px] rounded border-[1px] border-solid border-[#E9E9E9] bg-[#F5F5F5] shadow-lg z-50">
          {options.map((option) => (
            <div
              key={option.value}
              className={`px-[10px] py-[8px] cursor-pointer hover:bg-[#ECECEC] text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000] first:rounded-t last:rounded-b ${
                option.value === orderTypeDropdown ? "bg-[#ECECEC]" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderTypeDropdown;
