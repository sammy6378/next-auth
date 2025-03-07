import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage  from "redux-persist/lib/storage";
import authSlice from '../services/slices/UserSlice';
import { authService } from "../services/authService";


// persit auth config for auth
const persistAuthConfig = {
    key: "Auth",
    storage,
    whitelist: ["accessToken", "expiresAt"], 
}

// apply persistreducer to authslice
const persistAuthReducer = persistReducer(persistAuthConfig, authSlice);

export const Store = configureStore({
    reducer: {
        auth: persistAuthReducer,
        [authService.reducerPath]: authService.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: {
        ignoredActions: [
            "persist/PERSIST", // 🚀 Ignore redux-persist actions
            "persist/REHYDRATE",
            "persist/REGISTER"
        ],
        ignoredPaths: ["auth._persist"],
    }})
    .concat(authService.middleware)
});




// Infer the type of Store
export type AppStore = typeof Store
// Infer the `RootState` and `AppDispatch` types from the store itself
export const persistor = persistStore(Store);
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']