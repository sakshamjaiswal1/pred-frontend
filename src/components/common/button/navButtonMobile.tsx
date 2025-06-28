import { Link } from "react-router-dom";

function NavButtonMobile({
  className = "",
  isActive,
  title,

  isAnchor,
  to,

  Icon,
  isDisabled,
  onClick,
  ...otherProps
}: {
  title: string;
  className?: string;
  isActive?: boolean;

  to: string;
  isAnchor?: boolean;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const baseClasses = `${className} min-w-[66px] flex flex-col items-center justify-center gap-y-[4px] py-[12px] 
    transition-all duration-300 ease-in-out transform
    hover:scale-105 active:scale-95
    ${
      isActive ? "text-[#000000]" : "text-[#535353]/70 hover:text-[#000000]/80"
    } 
    text-[14px] font-[500] leading-[16px] tracking-[0.5px]
    ${isDisabled ? "pointer-events-none opacity-50" : ""}`;

  const iconClasses = `h-[24px] w-[24px] transition-colors duration-300 ease-in-out
    ${isActive ? "text-[#000000]" : "text-[#535353]/70"}`;

  if (isAnchor) {
    return (
      <div className={baseClasses} {...otherProps} onClick={() => onClick?.()}>
        <Icon className={iconClasses} />
        <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
          {title}
        </span>
      </div>
    );
  } else {
    return (
      <Link to={to} className={baseClasses} {...otherProps}>
        <Icon className={iconClasses} />
        <span className="transition-transform duration-200 ease-in-out hover:scale-110 inline-block">
          {title}
        </span>
      </Link>
    );
  }
}

export default NavButtonMobile;
