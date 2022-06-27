import '../styles/globals.css'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import MainNavigation from '../components/Layout/MainNavigation'
import {SessionProvider as NextAuthProvider} from 'next-auth/react';
import {Provider as ReduxProvider} from 'react-redux';
import store from '../store/index';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
    </Head>
    <NextAuthProvider session={pageProps.session}><ReduxProvider store={store}><MainNavigation> <Component {...pageProps} /> </MainNavigation></ReduxProvider></NextAuthProvider>
    </>
    )
  }

export default MyApp
