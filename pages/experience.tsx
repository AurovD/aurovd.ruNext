import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {About} from "../components/About";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";

export default function AboutPage({stat}) {
    const obj = {
        id: 1,
        title: "Опыт"
    }
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Опыт | Аюров Дмитрий | Веб разработка | Портфолио</title>
                <meta name="author" content="Аюров Дмитрий"/>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href="https://www.aurovdm.ru/experience"/>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                <meta property="og:title" content="Опыт | Аюров Дмитрий | Веб разработка | Портфолио"/>
                <meta property="og:description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta property="og:url" content="https://www.aurovdm.ru/experience"/>
                <meta name="description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta name="keywords" content="Аюров Дмитрий, веб разработка, портфолио, web development, web developer, проекты, работы, backend, frontend, резюме"/>
            </Head>
            <Panel {...obj}/>
            <About stat={stat || null}/>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const stat = await ProjectsApi(Axios).tags();
        return {
            props: {
                stat
            },
        }
    } catch (error) {
        return {
            props: {
                stat: null
            }
        }
    }
};