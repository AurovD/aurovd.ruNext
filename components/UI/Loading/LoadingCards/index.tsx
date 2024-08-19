import React from 'react';
import clsx from "clsx";
import styles from './LoadingCards.module.scss';



export const LoadingCards: React.FC = () => {
    return (
        <div className={clsx("border-box", styles.card)}>
        </div>
    )
};