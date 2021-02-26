
import React from "react";
import { CompletedChallenges } from '../components/CompletedChallenges';
import { CountDown } from '../components/CountDown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDownProvider } from "../contexts/CountDownContext";

export default function Home() {
  return (
    <div className ={styles.container}>
      <Head>
        <title> Inicio | move.it</title>
      </Head>

    <ExperienceBar />

    <CountDownProvider>
    <section>
      <div>
        <Profile/>
        <CompletedChallenges />
        <CountDown />
      </div>
      <div>
        <ChallengeBox/>
      </div>
    </section>
    </CountDownProvider>
   </div>
  )
}
