import React from 'react';
import clsx from "clsx";
import styles from './LoadingGrid.module.scss';
import {LoadingCards} from "../LoadingCards";



export const LoadingGrid: React.FC = () => {

    return (
        <div className={clsx("container", styles.project_grid)}>
            {[...Array(6)].map((_, index) => <LoadingCards key={index}/>)}
        </div>
    )
};