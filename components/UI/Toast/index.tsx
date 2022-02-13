import React from 'react';
import clsx from "clsx";
import styles from './Toast.module.scss';

interface IMsg {
    msg: string;
    status?: number
}

export const Toast: React.FC<IMsg> = ({msg, status}) => {
    console.log(msg, status);
    //TODO ширина инпутов
    return (
        <div className={clsx(styles.toast)}>
            {msg}
        </div>
    )
};