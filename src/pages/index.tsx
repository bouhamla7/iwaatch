import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.scss";
import HomeHero from "@/components/HomeHero";
import HomeListAll from "@/components/HomeListAll";

// discord Invitation
import { useEffect } from "react";
import { toast } from "sonner";
import { FaDiscord } from "react-icons/fa";
// discord Invitation

export default function Home() {
  // discord Invitation
  useEffect(() => {
    toast.info(
      <a
        target="_blank"
        href="https://discord.gg/6xJmJja8fV"
        className="discordInvitation"
      >
        <FaDiscord />
        Be part of our Rive community on Discord
      </a>,
    );
  }, []);
  // discord Invitation
  return (
    <div className={styles.Home}>
      <HomeHero />
      <HomeListAll />
    </div>
  );
}
