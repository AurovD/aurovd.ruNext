import React from 'react';
import clsx from "clsx";
import styles from './ErrorPage.module.scss';
import Link from "next/link";


export const ErrorPage: React.FC = () => {

    return (
        <div className={clsx("wrapper relative", styles.error_page)}>
            <div className={clsx("wrapper relative", styles.error_page_wrapper)}>
                <div className={clsx(styles.error_headers)}>
                    <h2>СТРАНИЦА НЕ<br />НАЙДЕНА</h2>
                    <Link href="/">ВЕРНУТЬ<br />МЕНЯ ОБРАТНО</Link>
                </div>
            </div>
        </div>
    );
};
