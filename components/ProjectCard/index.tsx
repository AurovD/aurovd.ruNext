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
        <Link href={"/project/" + project.id}>
            <div className={clsx("border-box", styles.card)}>
                <div className={clsx(error ? styles.error_image : "")}>
                    <img src={
                        loading || error ? "https://media3.giphy.com/media/rzIOcIZEKeKiY/giphy.gif" : "/projects_images/" + project.images[0] }
                         alt={project.title}
                         onLoad={() => setLoading(false)}
                         onError={() => setError(true)}
                    />
                </div>
                <div className={clsx("border-box", styles.card__description)}>
                    <h2 className={clsx(styles.card__title)}>{project.title}</h2>
                    <p>{project.Tags && project.Tags.map(tag => <span key={tag.id}>{tag.title}</span>)}</p>
                </div>
            </div>
        </Link>
    )
});

export default ProjectCard;