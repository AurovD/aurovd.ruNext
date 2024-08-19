import React from 'react';
import {ErrorPage} from "../components/ErrorPage";
import Head from "next/head";

export default function Error() {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Нет такой страницы</title>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
            </Head>
            <ErrorPage/>
        </>
    )
};