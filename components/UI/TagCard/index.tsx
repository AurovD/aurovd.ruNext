import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './TagCard.module.scss';
import {Tags} from "../../../types/types";
import Image from "next/image";


export const TagCard: React.FC<Tags> = ({count, title}) => {
    const [error, setError] = useState(false);
    return (
        <div className={clsx("d-flex", styles.tag)}>
            <div className={clsx(styles.tag_logo)}>
                { error ?
                    <div className={clsx(styles.tag_error)}></div>
                    :
                    <Image
                        className={clsx(styles.tag_img)}
                    src={`/assets/${title.slice(1)}.svg`}
                    alt={title}
                    onError={() => setError(true)}
                        width={35}
                        height={35}
                    />}
            </div>
            <div className={clsx("d-flex flex-column justify-content-center relative")}>
                <p className={clsx(styles.tag_title)}>{title}</p>
                {count && <p className={clsx(styles.tags_count)}>{count}</p>}
            </div>
        </div>
    )
};