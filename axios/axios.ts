import axios from 'axios';
import {getCookies} from "cookies-next";

let cookie = getCookies().token

const Axios = axios.create({
    // baseURL: 'http://localhost:3001',
    baseURL: 'https://aurovdm.ru/api',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + cookie,
    }
})

export { Axios };