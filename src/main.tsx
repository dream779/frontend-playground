import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./routes.tsx";
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import Theme from "./theme/index.ts";
// import { showInsetEffect } from "./utils/wave.ts";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <ConfigProvider
        // wave={{ showEffect: showInsetEffect }}
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: Theme.color_6,
            borderRadius: 4,
          },
        }}
      >
        <Analytics />
        <SpeedInsights />
        <RouterProvider router={router} />
      </ConfigProvider>
    </Suspense>
  </React.StrictMode>
);
