import '../styles/globals.css'

import type { AppProps } from 'next/app'
import MainNavigation from '../components/Layout/MainNavigation'
import {Provider} from 'react-redux'
import store from '../store/index';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}><MainNavigation> <Component {...pageProps} /> </MainNavigation></Provider>
}

export default MyApp
