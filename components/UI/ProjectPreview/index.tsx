import React, {useState} from "react";
import clsx from "clsx";
import styles from "./ProjectPreview.module.scss";
import Image from "next/image";
import router from "next/router";


const ProjectPreview = React.memo<{image: string}>(({image}) => {
    const [error, setError] = useState(false);

    const handleClick = async () => {
        await router.push("https://aurovdm.ru/images/" + image);
    }

    return (
        <div className={clsx("m-10", styles.preview, error ? styles.error_preview : "")} onClick={handleClick}>
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
