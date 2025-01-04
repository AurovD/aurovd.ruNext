import {create} from "zustand";
import {useProjects} from "../Projects/projects";
import {IProjects} from "../../types/types";
import {array} from "yup";

interface useSearchBar {
    filters: string[], // Set???
    searching: (request: string) => void,
    projectFilteringAll: (request: string) => void,
    tagsFiltering: (project: IProjects, request: string) => boolean,
    message: string,
}

export const useSearchBar = create<useSearchBar>((set, get) => ({
    filters: [],
    searching: (request, ) => {
        set({message: ""});
        if(!request){
            return;
        }
        let isAllProjectsLoaded = useProjects.getState().isAllProjectsLoaded();
        const {projectFilteringAll} = get();
        if(isAllProjectsLoaded) {
            projectFilteringAll(request);
        }
    },
    projectFilteringAll: (request) => {
        // let projects = useProjects.getState().projects;
        let projects = useProjects.getState().projects;
        const {tagsFiltering, filters} = get();
        if (!filters.includes(request)) {
            let result = projects.filter((project) => {
                if(project.title.toLowerCase().includes(request.toLowerCase()) || tagsFiltering(project, request)) {
                    return project;
                }
            });
            if(result.length){
                set({ filters: [...filters, request] });
                useProjects.setState({projects: result});
            } else {
                set({message: "Проекты по запросу не найдены"});
            }

        }
    },
    tagsFiltering: (project, request) => {
        if (project.Tags.length) {
            return project.Tags.some(tag =>
                tag.title.slice(1).toLowerCase().includes(request.toLowerCase())
            );
        }
        return false;
    },
    message: "",
}));