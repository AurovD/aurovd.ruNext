import React from 'react';
import Head from "next/head";
import {Panel} from "../components/Panel";

export default function Projects() {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }
    return (
        <div className="grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>About</title>
            </Head>
            <Panel {...obj}/>
            <div>Projects</div>
        </div>
    )
};