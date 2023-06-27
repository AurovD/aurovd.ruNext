// import {ProjectsApi} from "./ProjectsApi";
// import axios, {AxiosInstance} from 'axios';
// type ApiReturnType = ReturnType<typeof ProjectsApi>;
// import {getCookies, setCookie} from "cookies-next";
//
// let cookie = getCookies().token
//
//
// export const Api =(ctx: any): ApiReturnType  => {
//     const instance: AxiosInstance  = axios.create({
//         baseURL: 'http://localhost:3001',
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             "Authorization": 'Bearer ' + cookie,
//         }
//     });
//     return [ProjectsApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
// }

import axios from 'axios';
import {getCookies} from "cookies-next";

let cookie = getCookies().token

const Axios = axios.create({
    // baseURL: 'http://localhost:3001',
    baseURL: 'https://aurovdm.ru/api',
    headers: {
        "Accept": "application/json",
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + cookie,
    }
})

export { Axios };