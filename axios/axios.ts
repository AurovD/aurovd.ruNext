import axios from 'axios';

const Axios = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

export { Axios };