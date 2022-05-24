import React from 'react';
import clsx from "clsx";
import styles from './ProjectCard.module.scss';
import {IProjects} from "../../types/types";
import Link from "next/link";

interface Project {
    project: IProjects;
}

export const ProjectCard: React.FC<Project> = ({project}) => {
    return (
        <Link href={"/project/" + project.id}>
            <div className={clsx("border-box", styles.card)}>
                <img src={"/hat-5.jpg"} alt={project.title}/>
                <div>
                    <h2 className={clsx(styles.card__title)}>{project.id}</h2>
                    <p>{project.Tags && project.Tags.map(tag => <span key={tag.id}>{tag.title}</span>)}</p>
                </div>
            </div>
        </Link>
    )
};