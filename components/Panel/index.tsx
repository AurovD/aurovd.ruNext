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
            <div className={clsx("d-flex flex-column", styles.contacts)}>
                <p>+7(926)541-13-08</p>
                <div className={clsx("d-flex")}>
                    <a href="https://t.me/aurovdm">telegram</a>
                    <a href="https://vk.com/aurovdm">vkontakte</a>
                    <a href="https://www.facebook.com/profile.php?id=100052364083518&ref=bookmarks">facebook</a>
                    <a href="https://www.instagram.com/buckle_jean/">instagram</a>
                    <a href="https://github.com/AurovD">github</a>
                </div>
            </div>
        </div>
    )
});

export default Panel;