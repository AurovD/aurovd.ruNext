import React from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import {Login} from "../components/Login";
import {deleteCookie, getCookies} from "cookies-next";
import {GetServerSideProps} from "next";
import {ProjectsApi} from "../api/ProjectsApi";
import {Axios} from "../axios/axios";

export default function LoginPage() {
    const obj = {
        title: "ЛОГИН"
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>ЛОГИН</title>
            </Head>
            <Panel {...obj}/>
            <Login/>
        </div>
    )
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        if(getCookies(ctx).token){
            const user = await ProjectsApi(Axios).checkAuth(getCookies(ctx).token);
            if(!user){
                deleteCookie('token');
                return {
                    redirect: {
                        permanent: false,
                        destination: '/'
                    }
                }
            }
            return {
                redirect: {
                    permanent: false,
                    destination: '/admin'
                }
            }
        }
        return {
            props: {
            },
        }
    } catch (err) {
        return {
            props: {},
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
};