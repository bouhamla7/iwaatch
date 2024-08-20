import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import HomeHero from "@/components/HomeHero";
import HomeListAll from "@/components/HomeListAll";
import AdSense from "@/components/AdSense";
import { Ads } from "@/components/Ads"
import { AdblockDetector } from 'adblock-detector';
// discord Invitation
import { useEffect } from "react";
import { toast } from "sonner";
import { FaDiscord, FaDonate } from "react-icons/fa";
import useDeviceSize from "@/Utils/useDeviceSize";
// discord Invitation

export default function Home() {
  // discord Invitation

  // discord Invitation
  return (
    <div className={styles.Home}>
      <HomeHero />
      <HomeListAll />
      <AdSense pId="ca-pub-9098691343505810"/>

    </div>
  );
}
export default function Template({ children }: { children: React.ReactNode }) {

const adbDetector = new AdblockDetector() // call 

const userHasAdblock = adbDetector.detect() // detect adblock it return ture or false

  return (
    <>

      {userHasAdblock ? <Ads /> : null}

      <main className="py-12 container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="lg:w-3/4 xl:w-2/4 mx-auto"> {children} </div>
      </main>
    </>
  )

}
