import React from 'react';
import styles from './About.module.scss';
import clsx from "clsx";

export const About: React.FC = () => {
    return (
        <div className={clsx("container", styles.about)}>
            <div className={clsx(styles.introduction)}>
                <h1>
                    Aurov dmitry
                </h1>
                <div className={clsx(styles.introduction__main)}>
                    <img className={clsx(styles.introduction__photo)} src="/assets/me.JPG" alt="avatar"/>
                    <div className={clsx(styles.introduction__text)}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam culpa dolor dolores et exercitationem explicabo fugiat libero nesciunt nisi numquam, obcaecati omnis praesentium quam quidem similique ullam unde vel voluptatibus. Beatae consectetur dignissimos facilis molestiae nemo. Commodi dolor dolore doloremque facilis fugit, magni odio quod tempora unde veritatis voluptatem voluptates.
                    </div>
                </div>
            </div>
            jkhk
        </div>
    )
};