import React from 'react';
import Head from "next/head";
import {Panel} from "../components/Panel";
import {Projects} from "../components/Projects";
import {GetServerSideProps, InferGetServerSidePropsType} from "next";

export default function ProjectsPage({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }
    console.log(data)
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

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        let data = await fetch("http://localhost:3001/projects", {
            method: "get"
        });
        data = await data.json();
        return {
            props: {data}
        }
    } catch (e) {
        return {
            props: []
        }
    }

}