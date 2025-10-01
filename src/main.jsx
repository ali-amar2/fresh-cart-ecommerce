import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/cairo";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fontsource/encode-sans-expanded";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
