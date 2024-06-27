import { AnimatePresence } from "framer-motion";
import React from "react";
import { Provider } from "react-redux";
import { useLocation, useRoutes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { BestRoute } from "./pages/best-route";
import { Flow } from "./pages/flow";
import { SplashScreen } from "./pages/splash-screen";
import store from "./redux/store";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <SplashScreen />,
    },
    {
      path: "/melhor-rota",
      element: <BestRoute />,
    },
    {
      path: "/flow",
      element: <Flow />,
    },
  ]);

  const location = useLocation();

  if (!element) return null;

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark" storageKey="quick-route-theme">
        <AnimatePresence mode="wait">
          {React.cloneElement(element, { key: location.pathname })}
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
