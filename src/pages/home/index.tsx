import TopBar from "@/components/home/topbar";
import cskLogo from "@/assets/home/csklogo.png";

function Home() {
  return (
    <div>
      <TopBar
        title="Chennai Super Kings"
        volume="$65.2M Vol."
        percentChange={0.84}
        logoUrl={cskLogo}
      />
    </div>
  );
}

export default Home;
