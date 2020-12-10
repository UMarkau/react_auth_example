import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Menu } from "./components/Menu";
import { Router } from "./routes/Router";
import { StoreProvider } from "./store";

export const App = () => (
  <StoreProvider>
    <BrowserRouter>
      <div className="app">
        <Menu />
        <div className="content">
          <Router />
        </div>
      </div>
    </BrowserRouter>
  </StoreProvider>
);
