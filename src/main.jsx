import "./index.css";
import App from "./App.jsx";
import { StrictMode } from "react";
import { store, persistedStore } from "./store/store.js";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
    <StrictMode>
      <ToastContainer />
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <App />
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
