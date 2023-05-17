//react router
import { BrowserRouter } from "react-router-dom";

//redux
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store";

//context providers
import { DarkModeProvider } from "@/contexts/DarkModeContext";
import { AlertProvider } from "@/contexts/AlertContext";

//layout
import Layout from "@/layouts/Layout";

import AppRoutes from "@/routes";

function AppConfig() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <DarkModeProvider>
          <AlertProvider>
            <Layout>
              <App />
            </Layout>
          </AlertProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}

function App() {
  return <AppRoutes />;
}

export default AppConfig;
