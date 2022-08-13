import React from 'react';
import clsx from "clsx";
import styles from './ProjectDescription.module.scss';

export const ProjectDescription: React.FC<{description: string}> = ({description}) => {
    return (
        <div className={clsx("border-box m-10", styles.description)}>
            {description}
        </div>
    )
};