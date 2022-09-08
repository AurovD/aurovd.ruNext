import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

import styles from './Panel.module.scss';

interface PanelProps {
    id?: number;
    title: string;
    h2?: string;
    tags?: Array<{id: number, title: string}>
}

const Panel = React.memo<PanelProps>(({id, title, h2, tags}) => {
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
                {
                    tags && tags.length ?
                        tags.map(tag => <span key={tag.id}>{tag.title}</span>) :
                        null
                }
                {h2 && <h2 className={clsx("mt-0 mb-0")}>{h2}</h2>}
            </div>
            <div className={clsx("d-flex", styles.contacts)}>
                <Link  href={"https://t.me/aurovdm"}>
                    {/*<svg className={clsx(styles.contacts__item)}></svg>*/}
                    <svg height="100" width="100">
                        <circle cx="50" cy="50" r="40" />
                    </svg>
                    {/*<a target="_blank" href="https://t.me/aurovdm"></a>*/}
                </Link>
                {/*<a target="_blank" href="https://github.com/AurovD">github</a>*/}
                {/*<a target="_blank" href="https://github.com/AurovD">cv</a>*/}
            </div>
        </div>
    )
});

export default Panel;


            function person() {
                let name = "Peter";

                return function displayName() {
                    console.log(name);
                };
            }

            let peter = person();
            peter(); //выведет 'Peter'