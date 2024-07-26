import React, {useEffect} from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {Projects} from "../components/Projects";
//import dynamic from "next/dynamic";
import {ProjectReq} from "../types/types";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";
import {LoadingGrid} from "../components/UI/Loading/LoadingGrid";
import {useProjects} from "../components/Projects/projects";

// const Projects = dynamic<React.ComponentProps<typeof ProjectsComp>>(
//     () => import('../components/Projects').then(mod => mod.Projects),
// )

export default function ProjectsPage () {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }


    const [projects, loadProjects, isAllProjectsLoaded, offset, status] = useProjects(state => [
        state.projects,
        state.loadProjects,
        state.isAllProjectsLoaded,
        state.offset,
        state.status,
    ]);


    useEffect(() => {
        loadProjects();
    }, []);

    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Проекты | Аюров Дмитрий | Веб разработка | Портфолио</title>
                <meta name="author" content="Аюров Дмитрий"/>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href="https://www.aurovdm.ru"/>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                <meta property="og:title" content="Проекты | Аюров Дмитрий | Веб разработка | Портфолио"/>
                <meta property="og:description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta property="og:url" content="https://www.aurovdm.ru"/>
                <meta name="description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta name="keywords" content="Аюров Дмитрий, веб разработка, портфолио, web development, web developer, проекты, работы, backend, frontend, резюме"/>
            </Head>
            <Panel {...obj}/>
            {
                status === "error" || status === "loading" ? <LoadingGrid/> : <Projects projects={projects}/>
            }
        </div>
    )
};