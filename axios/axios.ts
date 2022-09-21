import axios from 'axios';

import { parseCookies } from 'nookies';

const cookies = parseCookies();


const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": 'Bearer ' + cookies?.token,
    }
});

export { Axios };