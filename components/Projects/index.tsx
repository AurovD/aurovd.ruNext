import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './Projects.module.scss';
import {IProjects, ProjectReq} from "../../types/types";
import ProjectCard from "../ProjectCard";
import {useObserver} from "../../hooks/useObserver";
import {useProjects} from "./projects";


interface Projects {
    projects: IProjects[];
}

export const Projects: React.FC<Projects> = ({projects}) => {

    const [setOffset, loadProjects, isAllProjectsLoaded,] = useProjects(state => [
        state.setOffset,
        state.loadProjects,
        state.isAllProjectsLoaded,
    ]);

    const observer = React.useRef();


    useObserver(observer, () => {
        if (!isAllProjectsLoaded()) {
            setOffset();
            loadProjects();
        }
    })

    // const handleSortByBiggestFirst = () => {
    //     // setSortOrder('biggestFirst');
    //     setProjects([...projects].sort((a, b) => b.id - a.id));
    // };
    //
    // const handleSortBySmallestFirst = () => {
    //     // setSortOrder('smallestFirst');
    //     setProjects([...projects].sort((a, b) => a.id - b.id));
    // };

    return (
        <>
            <div className={clsx("wrapper")}>
                {/*<div className={clsx(styles.project_grid)}>*/}
                {/*    <div className={clsx(styles.sort_buttons)} onClick={handleSortByBiggestFirst}>*/}
                {/*        Новые вперед*/}
                {/*    </div>*/}
                {/*    <div className={clsx(styles.sort_buttons)} onClick={handleSortBySmallestFirst}>*/}
                {/*        Новые*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<SearchBar/>*/}
                <div className={clsx(styles.project_grid)}>
                    {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
                    <div ref={observer} className={styles.observer}>Observer</div>
                </div>
            </div>
        </>
)
};