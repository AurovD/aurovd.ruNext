import React from 'react';
import Head from "next/head";
import {Panel} from "../components/Panel";
import {Projects} from "../components/Projects";
import {GetServerSideProps} from "next";
import {Api} from "../api";

export default function ProjectsPage ({ data }) {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }

    const [projects, setProjects] = React.useState(data);
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Projects</title>
            </Head>
            <Panel {...obj}/>
            <Projects data={projects}/>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
    try {
        res.setHeader(
            'Cache-Control',
            'public, s-maxage=10, stale-while-revalidate=59'
        )
        const data = await Api(req).getProjects(0);
        return {
            props: {data: data.projects}
        }
    } catch (e) {
        return {
            props: {data: []}
        }
    }

}