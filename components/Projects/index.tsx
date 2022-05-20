import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './Projects.module.scss';
import {ProjectReq} from "../../types/types";
import {ProjectCard} from "../ProjectCard";
import {useObserver} from "../../hooks/useObserver";
import {Axios} from "../../axios/axios";
import {ProjectsApi} from "../../api/ProjectsApi";


interface Projects {
    data: ProjectReq;
}

export const Projects: React.FC<Projects> = ({data}) => {
    const observer = React.useRef();
    const [projects, setProjects] = useState(data.projects);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(5);
    // const isPostsLoading = false;


    useEffect(() => {
        if(offset > 0){
            ProjectsApi(Axios).getProjects(offset).then(async (res: ProjectReq) => {
                setProjects([...projects, ...res.projects]);
            });
        }
    }, [offset]);

    // const changeOffset = (state) => {
    //     console.log(projects.length)
    //     return state + 6;
    // }

    useObserver(observer, () => {
        // setOffset(changeOffset);
        if(offset <= limit && data?.count > 0){
            setOffset(prev => {
                return prev + 6;
            });
        }
    })

    return (
        <div className={clsx("container", styles.project_grid)}>
            {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
            <div ref={observer} className={styles.observer}>Observer</div>
        </div>
)
};