import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {About} from "../components/About";

export default function AboutPage() {
    const obj = {
        id: 1,
        title: "О СЕБЕ"
    }
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>About</title>
            </Head>
            <Panel {...obj}/>
            <About/>
        </div>
    )
};