import React from 'react';
import clsx from "clsx";
import styles from './ProjectCard.module.scss';
import {IProjects} from "../../types/types";

interface Project {
    project: IProjects;
}
//TODO получить тэги
export const ProjectCard: React.FC<Project> = ({project}) => {
    return (
        <div className={clsx("border-box", styles.card)}>
            <img src={"/projects_images/preview-Tvf7VH1642528075548.jpeg"} alt={project.title}/>
            <div>
                <h2 className={clsx(styles.card__title)}>{project.title}</h2>
                <p>{project.title}</p>
            </div>
        </div>
    )
};