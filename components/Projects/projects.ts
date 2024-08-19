import { create } from 'zustand';
import {IProjects, ProjectReq, Status} from "../../types/types";
import {fetchRequest} from "../../helpers/fetch-request";


interface ProjectsStore {
    // projects:
    status: Status;
    loadProjects: () => void;
    loadedProjects: number;
    projects: IProjects[];
    offset: number;
    setOffset: () => void;
    isAllProjectsLoaded: () => boolean;
    total: number;
};
export const useProjects = create<ProjectsStore>((set, get) => ({
    isAllProjectsLoaded: () => {
        return get().total === get().loadedProjects;
    },
    loadProjects: async () => {
        const {projects} = get();

        const {total, offset, status, setOffset, isAllProjectsLoaded} = get();

        if(!total || status === "error"){
            set({status: "loading"});
        }

        try {
            const data = await fetchRequest<ProjectReq>(`https://aurovdm.ru/api/projects?offset=` + offset);
            console.log(data);
            set({
                projects: [...projects, ...data.projects],
                status: "success",
                loadedProjects: projects.length + data.projects.length,
                total: data.count
            });
            if(!isAllProjectsLoaded()){
                setOffset();
            }
        } catch (err) {
            set({status: "error"});
        }
    },
    loadedProjects: 0,
    projects: [],
    offset:  0,
    setOffset: () => set(state => ({ offset: state.offset + 6 })),
    status: 'default',
    total: 0
}));