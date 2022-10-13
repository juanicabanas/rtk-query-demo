import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import {store} from "../store/store";
import {NextUIProvider} from "@nextui-org/react";
import {darkTheme} from "../themes";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <NextUIProvider theme={darkTheme}>
                <Component {...pageProps} />
                <ToastContainer limit={1} />
            </NextUIProvider>
        </Provider>
    );
}

export default MyApp
