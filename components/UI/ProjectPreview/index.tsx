import React, {useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";
import Image from "next/image";


const ProjectPreview = React.memo<{image: string}>(({image}) => {
    const [error, setError] = useState(false);

    return (
        <div className={clsx("m-10", styles.preview, error ? styles.error_preview : "")}>
            <Image src={
                error ? "/assets/no_image.png" : "https://aurovdm.ru/images/" + image }
                 alt={image}
                 onError={() => setError(true)}
                   className={clsx(styles.image_preview)}
                   width={500}
                   height={280}
            />
        </div>
    )
});
export default ProjectPreview;
