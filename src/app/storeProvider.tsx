'use client'

import React from "react"
import { Provider } from "react-redux"
import { Store } from "@/componets/lib/store"
import { PersistGate } from "redux-persist/integration/react"
import { persistor } from "@/componets/lib/store"
import { SessionProvider } from "next-auth/react"

export default function StoreProvider({
    children,
}: { children: React.ReactNode }) {
    return (
        <Provider store={Store}>
            <PersistGate loading={null} persistor={persistor}>
                <SessionProvider>
                {children}
                </SessionProvider>
            </PersistGate>
        </Provider>
    )
}
