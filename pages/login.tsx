import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {Login} from "../components/Login";

export default function LoginPage() {
    const obj = {
        id: 3,
        title: "ВХОД"
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Вход</title>
            </Head>
            <Panel {...obj}/>
            <Login/>
        </div>
    )
};

export const getServerSideProps = async () => {
    try {
        console.log("kjhkhh")
        return {props: {}}
    } catch (err) {
        console.log("err")
    }
};