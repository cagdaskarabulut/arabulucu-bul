import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import Script from "next/script";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

      <Head>
        <title>Welcome!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta
          name="google-site-verification"
          content="mcF3__vXdmLl7JaonN29Ku4IIeQs5oH_MWokPa8p6U8"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default CustomApp;
