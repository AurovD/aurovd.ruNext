import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './TagCard.module.scss';
import {Tags} from "../../../types/types";
import axios from "axios";
import Image from "next/image";


export const TagCard: React.FC<Tags> = ({count_of_tags, Tag}) => {
    const [error, setError] = useState(false);
    //const [img, setImg] = useState(false);

    // const x = async () => {
    //         await axios(
    //             `/assets/${Tag.title.slice(1)}.svg`,
    //         ).then(() => {
    //             setImg(false)
    //         })
    //             .catch(() => {
    //                 setImg(true)
    //             })
    // }
    // useEffect(() => {
    //     x();
    // })

    return (
        <div className={clsx("d-flex", styles.tag)}>
            <div className={clsx(styles.tag_logo)}>
                { error ?
                    <div className={clsx(styles.tag_error)}></div>
                    :
                    <Image
                        className={clsx(styles.tag_img)}
                    src={`/assets/${Tag.title.slice(1)}.svg`}
                    alt={Tag.title}
                    onError={() => setError(true)}
                        width={35}
                        height={35}
                    />}
            </div>
            <div className={clsx("d-flex flex-column justify-content-center relative")}>
                <p>{Tag.title}</p>
                <p>{count_of_tags}</p>
            </div>
        </div>
    )
};