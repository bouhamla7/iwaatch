import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
              <Script
    async
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9098691343505810`}
    strategy="lazyOnload"
    crossOrigin="anonymous"
   ></Script>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
