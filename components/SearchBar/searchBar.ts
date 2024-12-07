import {create} from "zustand";
import {useProjects} from "../Projects/projects";
import {IProjects} from "../../types/types";
import {array} from "yup";

interface useSearchBar {
    filters: string[], // Set???
    searching: (request: string) => void,
    projectFiltering: (request: string) => void,
    tagsFiltering: (project: IProjects, request: string) => boolean,
}

export const useSearchBar = create<useSearchBar>((set, get) => ({
    filters: [],
    searching: (request, ) => {
        // let result = useProjects.getState().projects;
        if(!request){
            return;
        }
        let isAllProjectsLoaded = useProjects.getState().isAllProjectsLoaded();
        const {projectFiltering} = get();
        if(!isAllProjectsLoaded) {
            projectFiltering(request);
        }
    },
    projectFiltering: (request) => {
        let projects = useProjects.getState().projects;
        const {tagsFiltering, filters} = get();

        if (!filters.includes(request)) {
            let result = projects.filter((project) => {
                if(project.title.toLowerCase().includes(request.toLowerCase()) || tagsFiltering(project, request)) {
                    return project;
                }
            });

            set({ filters: [...filters, request] });

            console.log(result, filters, "ljl")
        }
    },
    tagsFiltering: (project, request) => {
        if (project.Tags.length) {
            return project.Tags.some(tag =>
                tag.title.slice(1).toLowerCase().includes(request.toLowerCase())
            );
        }
        return false;
    }
}));