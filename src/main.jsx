import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { start } from "./mocks/server.js";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";

start();

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </Provider>

  // </React.StrictMode>
);
