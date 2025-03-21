import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import { PreloaderProvider } from "./context/PreloaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <PreloaderProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </PreloaderProvider>
);
