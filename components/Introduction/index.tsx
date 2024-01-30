import React from 'react';
import styles from './Introduction.module.scss';
import clsx from "clsx";

export const Introduction: React.FC = () => {
    return (
        <div className={clsx("d-grid", styles.introductionWrapper)}>
             <div className={clsx(styles.introduction__avatar)}>
                 <div className={clsx("d-flex justify-content-center align-items-center")}>
                     <img src="/assets/me.JPG" alt="avatar"/>
                 </div>
                 {/*<div className={styles.qr_box}></div>*/}
             </div>
        </div>
    )
};