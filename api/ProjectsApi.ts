import {IProject} from "../types/types";
import { AxiosInstance } from 'axios';
import {array} from "yup";

export const ProjectsApi = (instance: AxiosInstance) => {
    return {
        getProjects: async (offset): Promise<{ count: number, projects: IProject[] }> => {
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
        }
    };
};