import { useRef, useState } from "react";
import predLogo from "@/assets/header/predLogo.png";
import StarOutline from "@/assets/header/star.svg?react";
import StarSolid from "@/assets/header/star-filled.svg?react";
import BellOutline from "@/assets/header/bell.svg?react";
import BellSolid from "@/assets/header/bellPressed.svg?react";
import ding from "@/assets/sounds/ding.mp3";
import NavButtonMobile from "../button/navButtonMobile";
import { useAppSelector } from "@/hooks/useRedux";
import MarketsIcon from "@/assets/bottomMenu/markets.svg?react";
import TradeIcon from "@/assets/bottomMenu/trade.svg?react";
import WalletIcon from "@/assets/bottomMenu/wallet.svg?react";
import MoreIcon from "@/assets/bottomMenu/more.svg?react";
import { HeaderToggleEnum } from "@/enum/orderToggle.enum";
import { useGlobalData } from "@/hooks/useGlobalData";

function Header() {
  const [isBellActive, setIsBellActive] = useState(false);
  const [isStarActive, setIsStarActive] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { userBalance } = useGlobalData();

  const [headerToggleState, setHeaderToggleState] = useState<HeaderToggleEnum>(
    HeaderToggleEnum?.TRADE
  );

  const handleBellClick = () => {
    setIsBellActive((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }

    const bell = bellRef.current;
    if (bell) {
      bell.classList.remove("animate-ring");
      void bell.offsetWidth;
      bell.classList.add("animate-ring");
    }
  };

  const handleStarClick = () => {
    setIsStarActive((prev) => !prev);
    const star = starRef.current;
    if (star) {
      star.classList.remove("animate-starpop");
      void star.offsetWidth;
      star.classList.add("animate-starpop");
    }
  };

  const { isMobile, isPWAOpened } =
    useAppSelector((state) => state?.globalData?.data) || {};

  return (
    <>
      <header className="px-6 py-[14px] flex items-center justify-between border-b border-[#E9E9E9] ">
        <div>
          <img src={predLogo} alt="Pred Logo" className="w-[19px] h-9" />
        </div>

        <div className="flex items-center gap-x-2.5">
          <div
            ref={starRef}
            onClick={handleStarClick}
            className="w-6 h-6 cursor-pointer relative"
          >
            {isStarActive ? (
              <StarSolid className="absolute top-0 left-0 w-6 h-6 transition-all" />
            ) : (
              <StarOutline className="absolute top-0 left-0 w-6 h-6 transition-all" />
            )}
          </div>

          <div
            ref={bellRef}
            onClick={handleBellClick}
            className="w-6 h-6 cursor-pointer origin-top-center"
          >
            <div className="relative w-6 h-6">
              <BellOutline
                className={`absolute top-0 left-0 w-6 h-6 transition-opacity duration-300 ${
                  isBellActive ? "opacity-0" : "opacity-100"
                }`}
              />
              <BellSolid
                className={`absolute top-0 left-0 w-6 h-6 transition-opacity duration-300 ${
                  isBellActive ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          <audio ref={audioRef} src={ding} preload="auto" />
        </div>
      </header>
      <div className="mx-auto px-[16px] md:px-[0px]">
        <div
          className={`${
            isMobile ? "w-full left-0" : "w-[412px] left-[calc(50%-206px)]"
          } fixed -bottom-[3px] px-[26px] bg-[#E9E9E9] flex items-center justify-between ${
            isPWAOpened ? "h-[85px] pb-[23px]" : "h-[65px] pb-[3px]"
          } z-[2]`}
        >
          <NavButtonMobile
            Icon={MarketsIcon}
            isActive={headerToggleState === HeaderToggleEnum.MARKETS}
            onClick={() => setHeaderToggleState(HeaderToggleEnum?.MARKETS)}
            title={"Markets"}
            to="/"
            isAnchor
          />
          <NavButtonMobile
            Icon={TradeIcon}
            title="Trade"
            to={"/"}
            isActive={headerToggleState === HeaderToggleEnum.TRADE}
            onClick={() => setHeaderToggleState(HeaderToggleEnum?.TRADE)}
            isAnchor
          />
          <NavButtonMobile
            Icon={WalletIcon}
            title={`$${userBalance}`}
            to="/"
            isActive={headerToggleState === HeaderToggleEnum.WALLET}
            onClick={() => setHeaderToggleState(HeaderToggleEnum?.WALLET)}
            isAnchor
          />
          <NavButtonMobile
            Icon={MoreIcon}
            title={"More"}
            to="/"
            isActive={headerToggleState === HeaderToggleEnum.MORE}
            onClick={() => setHeaderToggleState(HeaderToggleEnum?.MORE)}
            isAnchor
          />
        </div>
      </div>
    </>
  );
}

export default Header;
