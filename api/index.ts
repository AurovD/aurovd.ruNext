import {ProjectsApi} from "./ProjectsApi";
import axios from 'axios';
type ApiReturnType = ReturnType<typeof ProjectsApi>;

export const Api =(ctx: any): ApiReturnType  => {
    const instance = axios.create({
        baseURL: 'http://localhost:3001',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    });
    return [ProjectsApi].reduce((prev, f) => ({ ...prev, ...f(instance) }), {} as ApiReturnType);
}