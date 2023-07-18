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
        <div className={clsx("wrapper", styles.admin)}>
            <nav className={clsx("navigation d-flex justify-content-between", styles.navigation)}>
                    <Link href="/create" className={clsx(styles.active)}>СОЗДАТЬ ПРОЕКТ</Link>
                    <Link  href="/change" className={clsx(styles.active)}>СМЕНИТЬ ПАРОЛЬ</Link>
                    <Link  href="/" className={clsx(styles.active)} onClick={logout}>ВЫЙТИ</Link>
            </nav>
        </div>
    )
};