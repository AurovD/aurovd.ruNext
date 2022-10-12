import React from 'react';
import styles from './About.module.scss';
import clsx from "clsx";
import Link from "next/link";

export const About: React.FC = () => {
    return (
        <div className={clsx(styles.about)}>
            <div className={clsx(styles.introduction__bg)}>
                <div className={clsx(styles.introduction__bg_dark)}></div>
            </div>
            <div className={clsx("sticky", styles.introduction)}>
                <div className={clsx(styles.introduction__content)}>
                    <div className={clsx("mb-30", styles.introduction__header)}>
                        <h3>ДМИТРИЙ</h3>
                        <h3>АЮРОВ</h3>
                        <h3>ВЕБ-РАЗРАБОТЧИК</h3>
                    </div>
                    <p>Занимаюсь разработкой несколько лет и готов реализовать Ваши идеи в осмысленное, изящное и красивое воплощение, которые привлечет клиентов и повысит конверсию. Для начала работы и сотрудничества  нам надо поговорить, так что кликайте на ссылку телеграмма внизу страницы</p>
                    <div className={clsx("d-flex mt-30", styles.introduction__contacts)}>
                        <Link  href={"https://t.me/aurovdm"}>
                            TELEGRAM
                        </Link>
                        <Link  href={"https://github.com/AurovD"}>
                            VKONTAKTE
                        </Link>
                        <Link  href={"/CV.pdf"}>
                            LINKDEKIN
                        </Link>
                    </div>
                </div>
            </div>
            <div className={clsx("sticky", styles.education)}>
                <h3>EDUCATION</h3>
            </div>
        </div>
    )
};