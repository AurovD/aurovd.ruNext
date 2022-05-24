import {IProjects} from "../types/types";
import { AxiosInstance } from 'axios';

export const ProjectsApi = (instance: AxiosInstance) => {
    return {
        getProjects: async (offset): Promise<{ count: number, projects: IProjects[] }> => {
        // getProjects: async (offset): Promise<IProject[]> => {
            const { data } = await instance.get('/projects?offset=' + offset);
            return data; 
        },
        createProject: async (body)  => {
            try {
                const {data, status}  = await instance.post('/project', body);
                return {msg: data.msg, status: status};
            } catch (e) {
                return e.response ? {msg: e.response.data.msg, status: e.response.status} : {msg: "Ошибка", status: 500};
            }
        },
        getProject: async (id: string | string[]): Promise<any> => {
            const { data } = await instance.get(`/project?id=${id}`);
            return data;
        },
    };
};