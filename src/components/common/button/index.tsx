function Button({
  isFullWidth,
  className = "",
  title,
}: {
  title: string;
  isFullWidth?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`py-[10px]  px-[15px] rounded-[4px]  border-[1px] border-solid border-[#E9E9E9] bg-[#2B2B2B] text-[12px] font-[600] leading-[16px] tracking-[0.12px] text-[#ffffff] ${
        isFullWidth ? "w-full" : ""
      } ${className} `}
    >
      {" "}
      {title}{" "}
    </button>
  );
}

export default Button;
