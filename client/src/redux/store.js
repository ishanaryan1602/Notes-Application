import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice/authSlice";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, authSlice);

const authStore = configureStore({
    reducer: {
        auth: persistedReducer,
    },
});

const persistor = persistStore(authStore);

export { authStore, persistor };
