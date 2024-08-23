import { Html, Head, Main, NextScript } from "next/document";
import { GoogleAdSense } from "next-google-adsense";

export default function Document() {
  return (
    <Html lang="en">
     <GoogleAdSense />
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
