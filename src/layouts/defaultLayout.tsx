import Header from "@/components/common/header";

function DefaultLayout({
  MainContentComponent,
}: {
  MainContentComponent: React.FC;
}) {
  return (
    <div className="bg-[#64748b]">
      <div
        className={`md:max-w-[412px] md:mx-auto min-h-screen bg-[#FFFFFF]`}
      >
        <div
          className={` 
                    ${"min-h-screen"}  
                   
                    bg-neutral-greys-950 max-w-[1114px] mx-auto pb-[85px]`}
        >
          <Header />
          <MainContentComponent />
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
