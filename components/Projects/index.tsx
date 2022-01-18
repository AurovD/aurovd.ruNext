import React from 'react';
import {NextPage} from "next";
import clsx from "clsx";
import styles from './Projects.module.scss';

export const Projects: NextPage = () => {
    return (
        <div className={clsx(styles.project_grid)}>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
            <div className={clsx(styles.card)}>jhjkhkjk</div>
        </div>
)
};