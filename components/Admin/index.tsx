import React from 'react';
import styles from './Admin.module.scss';
import clsx from "clsx";
import Link from "next/link";
import {deleteCookie} from "cookies-next";

export const Admin: React.FC = () => {

    const logout = () => {
        deleteCookie("token");
    }

    return (
        <div className={clsx("container", styles.admin)}>
            <nav className={clsx("navigation d-flex justify-content-between", styles.navigation)}>
                <Link href="/create">
                    <a className={clsx(styles.active)}>СОЗДАТЬ ПРОЕКТ</a>
                </Link>
                <Link href="/change">
                    <a className={clsx(styles.active)}>СМЕНИТ ПАРОЛЬ</a>
                </Link>
                <Link href="/">
                    <a className={clsx(styles.active)} onClick={logout}>ВЫЙТИ</a>
                </Link>
            </nav>
        </div>
    )
};