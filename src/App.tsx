import "./App.css";
import RouterConfig from "./router.config";
import "@/scss/index.scss";
import PWAPrompt from "@/components/common/PWAPrompt";
import { usePerformance } from "@/hooks/usePerformance";

function App() {
  // Enable performance monitoring
  usePerformance();

  return (
    <>
      <RouterConfig />
      <PWAPrompt />
    </>
  );
}

export default App;
