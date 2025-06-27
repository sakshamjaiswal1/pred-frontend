function TopBar({logoUrl}: {
  title: string;
  volume: string;
  logoUrl: string;
  percentChange: number;
}) {
  return (
    <section className="pl-[17px] pr-[24px] flex items-center justify-between pt-[21px]">
      <div className="flex items-center gap-x-[8px]">
        <img src={logoUrl} alt="logo" className="h-12 w-12" />
      </div>
    </section>
  );
}

export default TopBar;
