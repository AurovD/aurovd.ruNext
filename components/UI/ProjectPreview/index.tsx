import React, {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";


export const ProjectPreview: React.FC<{image: string}> = ({image}) => {

    return (
        <div className={clsx(styles.preview)}>
            <img src={'/projects_images/' + image} alt={image}/>
        </div>
    )
}
