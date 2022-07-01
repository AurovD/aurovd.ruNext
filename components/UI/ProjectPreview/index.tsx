import React, {useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";


const ProjectPreview = React.memo<{image: string}>(({image}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className={clsx(styles.preview, error ? styles.error_preview : "")}>
            <img src={
                loading || error ? "https://media3.giphy.com/media/rzIOcIZEKeKiY/giphy.gif" : "/projects_images/" + image }
                 alt={image}
                 onLoad={() => setLoading(false)}
                 onError={() => setError(true)}
            />
        </div>
    )
});
export default ProjectPreview;
