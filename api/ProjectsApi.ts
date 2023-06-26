import {IProjects, Password, Tags, Statistic, IProject} from "../types/types";
import { AxiosInstance } from 'axios';
import {getCookies, setCookie} from 'cookies-next';

export const ProjectsApi = (instance: AxiosInstance) => {
    return {
        getProjects: async (offset): Promise<{ count: number, projects: IProjects[] }> => {
        // getProjects: async (offset): Promise<IProject[]> => {
            const { data } = await instance.get('/projects?offset=' + offset);
            return data;
        },
        createProject: async (body)  => {
            try {
                const {data}  = await instance.post('/project',  body);
                return {id: data.id};
            } catch (e) {
                return e.response.data.msg ? {msg: e.response.data.msg, status: e.response.status} : {msg: "Серверная ошибка", status: e.response.status};
            }
        },
        addImage: async (body, id)  => {
            try {
                const {data, status}  = await instance.post('/add_image/' + id,  body);
                return {msg: data.msg, status: status, new_images: data.new_images};
            } catch (e) {
                return e?.response?.data.message ? {msg: e.response.data.message, status: e.response.status} : {msg: "Серверная ошибка", status: e.response.status};
            }
        },
        changeProject: async (body, id)  => {
            try {
                const {data}  = await instance.post('/change/' + id,  body, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + getCookies().token,
                    }
                });
                return {data}
            } catch (e) {
                return e?.response?.data.message ? {msg: e.response.data.message, status: e.response.status} : {msg: "Серверная ошибка", status: e.response.status};
            }
        },
        changeTags: async (body, id)  => {
            try {
                const {data, status} = await instance.post('/change/tags/' + id,  body, {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + getCookies().token,
                    }});
                return {msg: data.message, status: status};
            } catch (e) {
                return e?.response?.data.message ? {msg: e.response.data.message, status: e.response.status} : {msg: "Серверная ошибка", status: e.response.status};
            }
        },
        getProject: async (id: string | string[]): Promise<any> => {
            const { data } = await instance.get(`/project?id=${id}`);
            return data;
        },
        delete: async (id: number, tags: string): Promise<any> => {
            const { data } = await instance.post(`/delete/${id}`, {tags});
            return data;
        },
        login: async (body): Promise<{ msg?: string, token?: string, status?: number }> => {
            try {
                const {data}   = await instance.post(`/login`, body);
                setCookie('token', data.token);
                return data;
            } catch (e) {
                return e.response?.data.msg ? {msg: e.response.data.msg, status: e.response.status} : {msg: "Неизвестная ошибка", status: 500 };
            }
        },
        change: async (body: Password): Promise<{ msg: string }> => {
            const { data }  = await instance.post(`/change`, JSON.stringify(body));
            return data;
        },
        tags: async (): Promise<Tags | { msg: string }> => {
            const { data }  = await instance.get(`/tags`, {timeout: 1000});
            return data;
        },
        checkAuth: async (cookie): Promise<any>=> {
            const { data }  = await instance.get(`/me`, {
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + cookie,
                }
            });
            return data;
        },
    };
};