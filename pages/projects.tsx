import React from 'react';
import Head from "next/head";
import {Panel} from "../components/Panel";
import {Projects} from "../components/Projects";

export default function ProjectsPage() {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Projects</title>
            </Head>
            <Panel {...obj}/>
            <Projects/>
        </div>
    )
};