import {create} from "zustand";
import {useProjects} from "../Projects/projects";
import {IProjects} from "../../types/types";

interface useSearchBar {
    searching: (request: string) => void,
    projectFiltering: (request) => void
}

export const useSearchBar = create<useSearchBar>((set, get) => ({
    searching: (request) => {
        let result = useProjects.getState().projects;
        if(!request){
            return;
        }
        let result = useProjects.getState().isAllProjectsLoaded();
        const {projectFiltering} = get();
        if(result) {
            projectFiltering(request);
        }
    },
    projectFiltering: (request) => {
        let projects = useProjects.getState().projects;
        let result = projects.filter((project) => {
            if(project.title.toLowerCase().includes(request.toLowerCase())) {
                return project;
            }
        })
        // useProjects.setState((prev) => ({
        //     projects: result
        // }))
    }
}));