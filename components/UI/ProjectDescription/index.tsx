import React from 'react';
import clsx from "clsx";
import styles from './ProjectDescription.module.scss';
import sanitizeHtml from 'sanitize-html';

export const ProjectDescription: React.FC<{ description: string }> = ({ description }) => {
    const sanitizeOptions = {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['h1', 'h2', 'h3', 'p']), // Add any additional allowed tags
        allowedAttributes: {},
    };

    const sanitizedDescription = sanitizeHtml(description, sanitizeOptions);

    return (
        <div className={clsx('border-box m-10', styles.description)}>
            <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
    );
};