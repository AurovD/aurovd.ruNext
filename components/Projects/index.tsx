import React from 'react';
import clsx from "clsx";
import styles from './Projects.module.scss';
import {IProjects} from "../../types/types";
import {ProjectCard} from "../ProjectCard";


interface Projects {
    data: Array<IProjects>;
}

export const Projects: React.FC<Projects> = ({data}) => {
    const observer = React.useRef();
    return (
        <div className={clsx("container", styles.project_grid)}>
            {data.length ? data.map(project => <ProjectCard key={project.id} project={project}/>) : <p>jgkhh</p>}
            <div className={styles.observer}>Observer</div>
        </div>
)
};