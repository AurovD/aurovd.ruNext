import React from "react";
import clsx from "clsx";
import styles from "./DescriptionLinks.module.scss"
import Link from "next/link";

export const DescriptionLinks: React.FC<{ link: string; title: string;}> = ({link, title}) => {
    return (
        <div className={clsx("m-10", styles.link)}>
            <div>{title}</div>
            <Link href={link}>
                {link}
            </Link>
        </div>
    )
}