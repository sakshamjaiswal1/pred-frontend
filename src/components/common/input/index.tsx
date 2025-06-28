function Input({
  className = "",
  placeholder = "",
  value,
  onChange,
  inputType = "text",
  rightElement,
  disabled = false,
}: {
  value?: string | number;
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputType?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  rightElement?: React.ReactNode;
  disabled?: boolean;
}) {
  return (
    <div
      className={`rounded border-[1px] border-solid border-[#E9E9E9] bg-[#F5F5F5] ${className}  pr-[10px] flex items-center justify-between`}
    >
      <input
        className="w-full h-full bg-transparent outline-none placeholder:text-[#000000]/50 placeholder:text-[12px] placeholder:font-[500] placeholder:leading-[16px] placeholder:tracking[0.12px] text-[12px] font-[500] leading-[16px] tracking-[0.12px] text-[#000000] m-0 py-[10px] pl-[10px] pr-[5px]"
        placeholder={placeholder || ""}
        value={value}
        onChange={onChange}
        type={inputType || "text"}
        disabled={disabled}
      />
      {rightElement && rightElement}
    </div>
  );
}

export default Input;
