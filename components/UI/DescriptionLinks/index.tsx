import React from "react";
import clsx from "clsx";
import styles from "./DescriptionLinks.module.scss"

export const DescriptionLinks: React.FC<{ link: string;}> = ({link}) => {
    return (
        <div
            className={clsx("m-10", styles.link)}
        >
            <a target="_blank" href={link}>{link}</a>
        </div>
    )
}