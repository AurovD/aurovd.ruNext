import React from "react";
import clsx from "clsx";
import styles from "./Task.module.scss"

export const Task: React.FC<{ title: string; color: string }> = ({title, color}) => {
    return (
        <div
            className={clsx("m-10", styles.task)}
            style={{backgroundColor: `${color}`}}
        >
            <div className={clsx(styles.task__header)}>Задача</div>
            <h2 className={clsx(styles.task__text)}>{title}</h2>
        </div>
    )
}