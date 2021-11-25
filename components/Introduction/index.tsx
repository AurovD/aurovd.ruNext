import React from 'react';
import styles from './Introduction.module.scss';
import clsx from "clsx";
import Link from 'next/link';
import {NextPage} from "next";

export const Introduction: NextPage = () => {
    return (
            <div className={clsx("d-grid", styles.introductionWrapper)}>
                    <div className={clsx(styles.introduction__box, styles.introduction__avatar)}>
                        <div className={clsx("d-flex justify-content-center align-items-center", styles.blur_box)}>
                            <img src="/assets/me.JPG" alt="avatar"/>
                        </div>
                    </div>
                    <div className={clsx(styles.introduction__box)}>4</div>
                    <div className={clsx("d-flex justify-content-center align-items-center", styles.introduction_box)}>
                        <div className={clsx(styles.presentation__box)}>
                            <h3>Проекты</h3>
                            <div className={clsx("d-flex", styles.projects_statistic)}>
                                <p className={clsx("d-flex align-items-center")}><span>3</span> проекта</p>
                                <p className={clsx("d-flex align-items-center")}><span>3</span> заказов</p>
                                <p className={clsx("d-flex align-items-center")}><span>3</span> клиентов</p>
                            </div>
                            <Link href="/projects">
                                Все проекты
                            </Link>
                        </div>
                    </div>
                    <div className={clsx("d-flex justify-content-center align-items-center pl-40 pr-40", styles.introduction__box)}>
                        <div className={clsx(styles.presentation__box)}>
                            <h3>О себе</h3>
                            <p>Сертифицированный специалист по MOS(Microsoft Word 2016) и MTA(Introduction to Programming Using HTML and CSS/Introduction to Programming Using JavaScript) с подверженной компетенцией в Веб-дизайне и разработки по стандартам Ворлдскиллс Россия.</p>
                            <Link href="/about">
                                <a href="">Узнать больше</a>
                            </Link>
                        </div>
                    </div>
            </div>
)
};