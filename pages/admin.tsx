import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {Admin} from "../components/Admin";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";
import {deleteCookie, getCookies} from "cookies-next";

export default function AdminPage() {
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>ПАНЕЛЬ АДМИНА</title>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
            </Head>
            <Panel title='ПАНЕЛЬ АДМИНА'/>
            <Admin/>
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
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
};