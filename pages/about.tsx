import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {About} from "../components/About";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";

export default function AboutPage({tags}) {
    const obj = {
        id: 1,
        title: "О СЕБЕ"
    }
    console.log(tags)
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>About</title>
            </Head>
            <Panel {...obj}/>
            <About tags={tags || null}/>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const tags = await ProjectsApi(Axios).tags();
        return {
            props: {
                tags
            },
        }
    } catch (error) {
        return {
            props: {
                tags: null
            }
        }
    }
};