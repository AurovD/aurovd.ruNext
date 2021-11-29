import clsx from 'clsx';
import React, {FC} from 'react';
import Link from 'next/link';

import styles from './Panel.module.scss';
import {NextPage} from "next";

// type MainContextProps = {
//     name: string
// }
//
// export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);
interface PanelProps {
    id: number;
    title: string;
    h2?: string;
}

export const Panel: FC<PanelProps> = ({id, title, h2}) => {
    return (
        <div className={clsx("column d-flex flex-column justify-content-between border-box", styles.panel)}>
            <nav className={clsx("navigation d-flex justify-content-between", styles.navigation)}>
                <Link href="/">
                    <a className={id === 0 ? clsx(styles.active) : ""}>ГЛАВНАЯ</a>
                </Link>
                <Link href="/about">
                    <a className={id === 1 ? clsx(styles.active) : ""}>ОПЫТ</a>
                </Link>
                <Link href="/projects">
                    <a className={id === 2 ? clsx(styles.active) : ""}>ПРОЕКТЫ</a>
                </Link>
            </nav>
            <div className={clsx(styles.title)}>
                <h1 className={clsx("mt-0 mb-0")}>{title}</h1>
                {h2 && <h2 className={clsx("mt-0 mb-0")}>{h2}</h2>}
            </div>
            <div>kjgjk</div>
        </div>
    )
};