import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './TagCard.module.scss';
import {Tags} from "../../../types/types";


export const TagCard: React.FC<Tags> = ({count_of_tags, Tag}) => {


    const [error, setError] = useState(false);



    // useEffect(() => {
    //     console.log(error);
    // }, [error])

    return (
        <div className={clsx("d-flex", styles.tag)}>
            <div className={clsx(styles.tag_logo)}>
                { error ?
                    <div className={clsx(styles.tag_error)}></div>
                    :
                    <img
                    src={`/assets/${Tag.title.slice(1)}.svg`}
                    alt={Tag.title}
                    onError={() => setError(true)}
                />}
            </div>
            <div className={clsx("d-flex flex-column justify-content-center relative")}>
                <p>{Tag.title}</p>
                <p>{count_of_tags}</p>
            </div>
        </div>
    )
};