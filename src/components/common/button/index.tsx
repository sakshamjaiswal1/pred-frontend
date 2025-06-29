function Button({
  isFullWidth,
  className = "",
  title,
  onClick,
}: {
  title: string;
  isFullWidth?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <button
      className={`py-[10px] px-[15px] rounded-[4px] border-[1px] border-solid border-[#E9E9E9] bg-[#2B2B2B] text-[12px] font-[600] leading-[16px] tracking-[0.12px] text-[#ffffff] 
        transition-all duration-200 ease-in-out
        hover:bg-[#1A1A1A] hover:shadow-lg hover:shadow-[#2B2B2B]/20 
        active:scale-95 active:duration-75
        focus:outline-none focus:ring-2 focus:ring-[#2B2B2B]/50 focus:ring-offset-1
        ${isFullWidth ? "w-full" : ""} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
        {title}
      </span>
    </button>
  );
}

export default Button;
