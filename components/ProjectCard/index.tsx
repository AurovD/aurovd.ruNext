import React, {useState} from 'react';
import clsx from "clsx";
import styles from './ProjectCard.module.scss';
import {IProjects} from "../../types/types";
import Link from "next/link";
import Image from "next/image";


interface ProjectCardProps {
    project: IProjects;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    if ('image' in project && 'title' in project) {
        return (
            <div className={clsx('border-box', styles.card)}>
                <Link href={project.image}>
                    <div className={clsx(error ? styles.error_image : '')}>
                        <Image
                            src={loading || error ? '/assets/no_image.png' : project.image}
                            alt={project.title}
                            onLoad={() => setLoading(false)}
                            onError={() => setError(true)}
                            width={200}
                            height={280}
                        />
                    </div>
                </Link>
                <div className={clsx('border-box', styles.card__description)}>
                    <h2 className={clsx(styles.card__title)}>{project.title}</h2>
                </div>

            </div>
        );
    }

    return (
        <div className={clsx('border-box', styles.card)}>
            <Link href={'/project/' + project.id}>
                <div className={clsx(error ? styles.error_image : '')}>
                    <Image
                        src={loading || error ? '/assets/no_image.png' : '/projects/preview-' + project.images[0] + '-400.jpg'}
                        // src={loading || error ? '/assets/no_image.png' : 'https://aurovdm.ru/images/preview-' + project.images[0] + '-400.jpg'}
                        alt={project.title}
                        onLoad={() => setLoading(false)}
                        onError={() => setError(true)}
                        width={200}
                        height={280}
                    />
                </div>
            </Link>
            <div className={clsx('border-box', styles.card__description)}>
                <Link href={'/project/' + project.id}>
                    <h2 className={clsx(styles.card__title)}>{project.title}</h2>
                </Link>
                <p>
                    {project.Tags &&
                        project.Tags.slice(0, 5).map((tag, index) => (
                            <span key={tag.title}>{tag.title}</span>
                        ))}
                    {project.Tags && project.Tags.length > 5 && (
                        <span>...</span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default ProjectCard;