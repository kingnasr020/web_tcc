import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <>
      <AppRoutes />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1e293b",
            color: "#f1f5f9",
            border: "1px solid rgba(51, 65, 85, 0.6)",
            borderRadius: "12px",
            fontSize: "14px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: { primary: "#22d3ee", secondary: "#0f172a" },
          },
          error: {
            iconTheme: { primary: "#f87171", secondary: "#0f172a" },
          },
        }}
      />
    </>
  );
}