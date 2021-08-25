import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

import styles from './Panel.module.scss';

// type MainContextProps = {
//     name: string
// }
//
// export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export const Panel = (obj) => {
    return (
        <div className={clsx("column d-flex flex-column justify-content-between border-box", styles.panel)}>
            <nav className={clsx("navigation d-flex justify-content-start", styles.navigation)}>
                <Link href="/">
                    <a className={obj.id === 0 ? clsx(styles.active) : ""}>ГЛАВНАЯ</a>
                </Link>
                <Link href="/about">
                    <a className={obj.id === 1 ? clsx(styles.active) : ""}>ОПЫТ</a>
                </Link>
                <Link href="/projects">
                    <a className={obj.id === 2 ? clsx(styles.active) : ""}>ПРОЕКТЫ</a>
                </Link>
                <Link href="/login">
                    <a className={obj.id === 3 ? clsx(styles.active) : ""}>ВОЙТИ</a>
                </Link>
            </nav>
            <div className={clsx(styles.title)}>
                <h1 className={clsx("mt-0 mb-0")}>{obj.title}</h1>
                {obj.h2 && <h2 className={clsx("mt-0 mb-0")}>{obj.h2}</h2>}
            </div>
            <div>kjgjk</div>
        </div>
    )
};