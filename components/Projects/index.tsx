import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './Projects.module.scss';
import {IProjects, ProjectReq} from "../../types/types";
import ProjectCard from "../ProjectCard";
import {useObserver} from "../../hooks/useObserver";
import {useProjects} from "./projects";
import {SearchBar} from "../SearchBar";
import {FiltersOrderPanel} from "../UI/FiltersOrderPanel";
import {useSearchBar} from "../SearchBar/searchBar";


interface Projects {
    projects: IProjects[];
}

export const Projects: React.FC<Projects> = ({projects}) => {

    const [loadProjects, isAllProjectsLoaded,] = useProjects(state => [
        state.loadProjects,
        state.isAllProjectsLoaded,
    ]);
    const [filters] = useSearchBar(state => [
        state.filters,
    ]);

    const observer = React.useRef();


    useObserver(observer, () => {
        if (!isAllProjectsLoaded()) {
            loadProjects();
        }
    });

    return (
        <>
            <div className={clsx("wrapper")}>
                {/*{filters.length > 0 && <FiltersOrderPanel/>}*/}
                {/*<SearchBar/>*/}
                <div className={clsx(styles.project_grid)}>
                    {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                    <div ref={observer} className={styles.observer}>Observer</div>
                </div>
            </div>
        </>
)
};