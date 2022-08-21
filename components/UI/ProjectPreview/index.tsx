import React, {useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";


const ProjectPreview = React.memo<{image: string}>(({image}) => {
    const [error, setError] = useState(false);

    return (
        <div className={clsx("m-10", styles.preview, error ? styles.error_preview : "")}>
            <img src={
                error ? "/assets/giphy.webp" : "/projects_images/" + image }
                 alt={image}
                 onError={() => setError(true)}
            />
        </div>
    )
});
export default ProjectPreview;
