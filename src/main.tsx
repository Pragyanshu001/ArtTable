import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PrimeReactProvider } from "primereact/api";

// PrimeReact styles (needed)
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css"; // choose any theme
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </StrictMode>
);
