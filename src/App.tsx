import "./App.css";
import RouterConfig from "./router.config";
import "@/scss/index.scss";
import PWAPrompt from "@/components/common/PWAPrompt";

function App() {
  return (
    <>
      <RouterConfig />
      <PWAPrompt />
    </>
  );
}

export default App;
