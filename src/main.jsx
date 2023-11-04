import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalProvider } from "./context/GlobalProvider.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ClientID } from "./utils/ClientID.js";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={ClientID}>
        <GlobalProvider>
          <BrowserRouter>
            <Toaster />
            <App />
          </BrowserRouter>
        </GlobalProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
