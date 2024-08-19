import React from 'react';
import Panel from "../components/Panel";
import {CreateProject} from "../components/Create";
import Head from "next/head";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";
import {deleteCookie, getCookies} from "cookies-next";

export default function Create() {
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>СОЗДАТЬ ПРОЕКТ</title>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
            </Head>
            <Panel title='СОЗДАТЬ ПРОЕКТ'/>
            <CreateProject/>
        </div>
    )
};

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
        return {
            props: {
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