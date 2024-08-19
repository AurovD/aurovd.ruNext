import Panel from "../../components/Panel";
import Head from "next/head";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import {Edit} from "../../components/Edit";
import {getCookies, deleteCookie} from "cookies-next";
import React from "react";

export default function UpdatePage({project}) {
    const obj = {
        title: "РЕДАКТИРОВАНИЕ"
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Редактирование</title>
            </Head>
            <Panel {...obj}/>
            <Edit project={project}/>
        </div>
    )
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const user = await ProjectsApi(Axios).checkAuth(getCookies(ctx).token);

        if(!user){
            deleteCookie('token', ctx);
            return {
                redirect: {
                    permanent: false,
                    destination: '/login'
                }
            }
        }
        const projectId = ctx.query.update;
        const project = await ProjectsApi(Axios).getProject(projectId as string);
        return {
            props: {
                project
            },
        }
    } catch (error) {
        deleteCookie('token', ctx);
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
};