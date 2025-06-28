function ButtonSecondary({
  title,
  onClick,
}: {
  title: string;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className="py-[3px] px-[11px] rounded-[4px] bg-[#EAEAEA] text-[14px] font-[400] tracking-[0.14px]
        transition-all duration-200 ease-in-out
        hover:bg-[#D5D5D5] hover:shadow-lg hover:shadow-[#EAEAEA]/30 
        active:scale-95 active:duration-75
        focus:outline-none focus:ring-2 focus:ring-[#EAEAEA]/50 focus:ring-offset-1"
      onClick={() => onClick?.()}
    >
      <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
        {title}
      </span>
    </button>
  );
}

export default ButtonSecondary;
