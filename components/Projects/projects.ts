import { create } from 'zustand';
import {IProjects, ProjectReq, Status} from "../../types/types";
import {fetchRequest} from "../../helpers/fetch-request";
import {useSearchBar} from "../SearchBar/searchBar";


interface ProjectsStore {
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
        return get().total === get().loadedProjects && get().loadedProjects > 0 && get().loadedProjects > 0;
    },
    loadProjects: async () => {
        const {projects} = get();
        const {total, offset, status, setOffset, isAllProjectsLoaded} = get();

        if(!total || status === "error"){
            set({status: "loading"});
        }

        let filters = useSearchBar.getState().filters;
        // console.log(JSON.stringify(filters));
        try {
            // filter=["price","category","rating"]
            // filter=price,category,rating
            //     const data = await fetchRequest<ProjectReq>(`http://localhost:3001/projects?offset=` + offset + `&filters=${JSON.stringify(filters)}`);
                const data = await fetchRequest<ProjectReq>(`https://aurovdm.ru/api/projects?offset=` + offset);
                set({
                    projects: [...projects, ...data.projects],
                    status: "success",
                    loadedProjects: projects.length + data.projects.length,
                    total: data.count
                });
                setOffset();
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