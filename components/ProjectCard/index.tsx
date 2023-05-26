import React, {useState} from 'react';
import clsx from "clsx";
import styles from './ProjectCard.module.scss';
import {IProjects} from "../../types/types";
import Link from "next/link";

interface Project {
    project: IProjects;
}
const ProjectCard = React.memo<Project>(({project}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
            <div className={clsx("border-box", styles.card)}>
                <Link href={"/project/" + project.id}>
                    <div className={clsx(error ? styles.error_image : "")}>
                        <img src={
                            loading || error ? "/assets/no_image.png" : "https://aurovdm.ru/images/" + project.images[0] }
                             alt={project.title}
                             onLoad={() => setLoading(false)}
                             onError={() => setError(true)}
                        />
                    </div>
                </Link>
                <div className={clsx("border-box", styles.card__description)}>
                    <Link href={"/project/" + project.id}>
                        <h2 className={clsx(styles.card__title)}>{project.title}</h2>
                    </Link>
                    <p>{project.Tags && project.Tags.map(tag => <span key={tag.id}>{tag.title}</span>)}</p>
                </div>
            </div>
    )
});

export default ProjectCard;