import React from 'react';
import clsx from "clsx";
import styles from './ProjectDescription.module.scss';
import {IProjects} from "../../../types/types";

interface ProjectDescriptionProps {
    description: IProjects;
}

export const ProjectDescription: React.FC<ProjectDescriptionProps> = ({description}) => {
    console.log(description)
    return (
        <div className={clsx("border-box", styles.description)}>
            <h2 className={clsx(styles.description__title)}>{description.title}</h2>
            <p>{description.description}</p>
        </div>
    )
};

// export default ProjectDescription;