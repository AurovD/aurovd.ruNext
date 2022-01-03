import {IProject} from "../types/types";
import { AxiosInstance } from 'axios';

export const ProjectsApi = (instance: AxiosInstance) => {
    return {
        getProjects: async (): Promise<IProject[]> => {
            const { data } = await instance.get('/projects');
            return data;
        },
        createProject: async (body): Promise<IProject> => {
            const { data } = await instance.post('/project', body);
            return data;
        }
    };
};