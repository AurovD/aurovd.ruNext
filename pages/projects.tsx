import React, {useEffect} from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {Projects} from "../components/Projects";
//import dynamic from "next/dynamic";
import {ProjectReq} from "../types/types";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";
import {LoadingGrid} from "../components/UI/Loading/LoadingGrid";

// const Projects = dynamic<React.ComponentProps<typeof ProjectsComp>>(
//     () => import('../components/Projects').then(mod => mod.Projects),
// )

export default function ProjectsPage () {
    const obj = {
        id: 2,
        title: "ПРОЕКТЫ"
    }

    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [projects, setData] = React.useState<ProjectReq>({
        count: 0,
        projects: []
    });

    const getListOfPjs = async () => {
            await ProjectsApi(Axios).getProjects(0).then(async (res: ProjectReq) => {
                if(res?.count > 0){
                    setData(res);
                    setIsLoading(false);
                }
            }).catch((e) => {
                console.log(e);
            })
    }


    useEffect(()=> {
        getListOfPjs()
    }, []);


    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Проекты</title>
            </Head>
            <Panel {...obj}/>
            {
                isLoading ? <LoadingGrid/> : <Projects data={projects}/>
            }
        </div>
    )
};