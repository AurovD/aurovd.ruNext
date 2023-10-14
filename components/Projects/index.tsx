import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './Projects.module.scss';
import {ProjectReq} from "../../types/types";
import ProjectCard from "../ProjectCard";
import {useObserver} from "../../hooks/useObserver";
import {Axios} from "../../axios/axios";
import {ProjectsApi} from "../../api/ProjectsApi";
import {SearchBar} from "../SearchBar";


interface Projects {
    data: ProjectReq;
}

export const Projects: React.FC<Projects> = ({data}) => {
    const observer = React.useRef();
    const [projects, setProjects] = useState(data.projects);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(5);

    useEffect(() => {
        if(offset > 0){
            ProjectsApi(Axios).getProjects(offset).then(async (res: ProjectReq) => {
                setProjects([...projects, ...res.projects]);
            });
        }
    }, [offset]);


    useObserver(observer, () => {
        if(offset <= limit && data?.count > 0){
            setOffset(prev => {
                return prev + 6;
            });
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