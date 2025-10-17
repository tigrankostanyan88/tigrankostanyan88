import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import Lenis from "lenis";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import { ProductProvider } from "./contexts/ProductContext.tsx";

const lenis = new Lenis();

function raf(time: DOMHighResTimeStamp) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <ProductProvider>
      <App />
    </ProductProvider>
  </LanguageProvider>
);
