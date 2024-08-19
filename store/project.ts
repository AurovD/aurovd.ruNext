import { create } from 'zustand';
import {IProjects, Status} from "../types/types";
import {fetchRequest} from "../helpers/fetch-request";
import {useProjects} from "../components/Projects/projects";

interface ProjectStore {
    project: Partial<IProjects>;
    status: Status;
    checkExisting: (id: number | string) => Partial<IProjects>;
    loadProject: (id: number | string) => void;
};
export const useProject = create<ProjectStore>((set, get) => ({
    project: {},
    status: "default",
    checkExisting(id) {
        const projects = useProjects.getState().projects;
        return projects.find(project => id == project.id);
    },
    loadProject:  async (id) => {
        const existingProject = get().checkExisting(id);

        const {status} = get();


        if(status === "error"){
            set({status: "loading"});
        }
        if(!existingProject){
            try {
                const data = await fetchRequest<IProjects>(`https://aurovdm.ru/api/project?id=`+ id);
                set({
                    project: data,
                    status: "success",
                });
            } catch (err) {
                set({status: "error"});
            }
            return;
        }
        set({
            project: existingProject,
            status: "success",
        })
    }
}));