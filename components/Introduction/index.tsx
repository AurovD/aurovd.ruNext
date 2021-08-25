import React from 'react';
import styles from './Introduction.module.scss';
import clsx from "clsx";

export const Introduction = () => {
    return (
            <div className={clsx("column d-grid", styles.introduction_wrapper)}>
                <div className={clsx("column d-grid", styles.intro_column)}>
                    <div style={{backgroundColor: "yellow"}}>1</div>
                    <div style={{backgroundColor: "blue"}}>2</div>
                </div>
                <div className={clsx("column d-grid", styles.intro_column, styles.intro_column__revers)}>
                    <div style={{backgroundColor: "orange"}}>3</div>
                    <div style={{backgroundColor: "green"}}>4</div>
                </div>
            </div>
)
};