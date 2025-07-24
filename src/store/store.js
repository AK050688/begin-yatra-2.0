import authReducer from "./userSlice";
import leadReducer from "./LeadSlice";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import loadingReducer from "./loadingSlice";
import sidebarSlice from "./sidebar";

const persistConfig = {
  key: "begin-yatra-auth",
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    leads: leadReducer,
    auth: persistedAuthReducer,
    loading: loadingReducer,
    sidebar: sidebarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PAUSE",
          "persist/PURGE",
          "persist/FLUSH",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistedStore = persistStore(store);
