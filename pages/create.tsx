import React from 'react';
import Panel from "../components/Panel";
import {CreateProject} from "../components/Create";
import Head from "next/head";

export default function Create() {
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>СОЗДАТЬ НОВЫЙ ПРОЕКТ</title>
            </Head>
            <Panel title='СОЗДАТЬ НОВЫЙ ПРОЕКТ'/>
            <CreateProject/>
        </div>
    )
};