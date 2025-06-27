import { useRef } from "react";
import predLogo from "@/assets/header/predLogo.png";
import Star from "@/assets/header/star.svg?react";
import Bells from "@/assets/header/bells.svg?react";

function Header() {
  const bellRef = useRef<HTMLDivElement>(null);

  const handleBellClick = () => {
    const bell = bellRef.current;
    if (!bell) return;

    bell.classList.remove("animate-ring");
    void bell.offsetWidth; // force reflow to restart animation
    bell.classList.add("animate-ring");
  };

  return (
    <header className="px-6 py-[14px] flex items-center justify-between border-b border-[#E9E9E9] bg-white">
      <div>
        <img src={predLogo} alt="predLogo" className="w-[19px] h-9" />
      </div>
      <div className="flex items-center gap-x-2.5">
        <Star className="w-6 h-6" />
        <div
          ref={bellRef}
          onClick={handleBellClick}
          className="w-6 h-6 cursor-pointer origin-top-center"
        >
          <Bells className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
}

export default Header;
