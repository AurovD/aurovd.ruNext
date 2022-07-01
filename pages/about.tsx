import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";

export default function About() {
    const obj = {
        id: 1,
        title: "О СЕБЕ"
    }
    return (
        <div className="grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>About</title>
            </Head>
            <Panel {...obj}/>
            <div>About</div>
        </div>
    )
};