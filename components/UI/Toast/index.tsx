import React, {memo} from 'react';
import clsx from "clsx";
import styles from './Toast.module.scss';

interface IMsg {
    msg: string;
    status?: number
}

export const Toast: React.FC<IMsg> = memo(({msg, status}) => {
    return (
        <div className={clsx(styles.toast, status === 200 ? "" : styles.error)}>
            {msg}
        </div>
    )
});