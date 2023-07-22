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
        title: "О СЕБЕ"
    }
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>О СЕБЕ</title>
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