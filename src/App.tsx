import "./App.css";
import RouterConfig from "./router.config";
import "@/scss/utility.scss";
import PWAPrompt from "@/components/common/PWAPrompt";
import { usePerformance } from "@/hooks/usePerformance";

function App() {
  usePerformance();

  return (
    <>
      <RouterConfig />
      <PWAPrompt />
    </>
  );
}

export default App;
