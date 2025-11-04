import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./services/api/query-client-helper.ts";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";
import { AudioProvider } from "./components/Audio/MusicContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <AudioProvider>
        <App />
      </AudioProvider>
    </Router>
  </QueryClientProvider>,
);
