import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "next-auth/react"
import type {Session} from "next-auth"
import {Provider} from "react-redux";
import {store} from '@/store'

export default function App({Component, pageProps: {session, ...pageProps},}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
            <Component {...pageProps} />
            </Provider>
        </SessionProvider>
    )
}
