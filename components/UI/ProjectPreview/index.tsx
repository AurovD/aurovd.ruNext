import React, {useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";
import Image from "next/image";


const ProjectPreview = React.memo<{image: string}>(({image}) => {
    const [error, setError] = useState(false);

    return (
        <div className={clsx("m-10", styles.preview, error ? styles.error_preview : "")}>
            <img src={
                error ? "/assets/giphy.webp" : "https://aurovdm.ru/images/" + image }
                 alt={image}
                 onError={() => setError(true)}
                   className={clsx(styles.image_preview)}
            />
        </div>
    )
});
export default ProjectPreview;
