import React from 'react';
import styles from './Introduction.module.scss';
import clsx from "clsx";
import Link from 'next/link';
import {NextPage} from "next";

export const Introduction: NextPage = () => {
    return (
            <div className={clsx("d-grid", styles.introduction__wrapper)}>
                <div className={clsx("column d-flex flex-column", styles.introduction__column)}>
                    <div className={clsx(styles.introduction__box, styles.introduction__avatar)}>
                        <div className={clsx("d-flex justify-content-center align-items-center", styles.blur_box)}>
                            <img src="/assets/me.JPG" alt="avatar"/>
                        </div>
                    </div>
                    <div className={clsx("d-flex justify-content-center align-items-center", styles.introduction__box)}>
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
                </div>
                <div className={clsx("column d-flex flex-column", styles.introduction__column)}>
                    <div className={clsx("d-flex justify-content-center align-items-center pl-30 pr-30", styles.introduction__box)}>
                        <div className={clsx(styles.presentation__box)}>
                            <h3>О себе</h3>
                            <p>Привет. Я веб-разработчик. Люблю JavaScript. В своей работе я стремлюсь к тому, чтобы людям было удобно и приятно работать с сайтами, над которыми я работал. Для этого я готов изучать новые технологии и развивать свои навыки под конкретные задачи.  Три года опыта Frontend разработки и один год Backend. Являюсь сертифицированным специалистом по MOS(Microsoft Word 2016) и MTA(Introduction to Programming Using HTML and CSS/Introduction to Programming Using JavaScript) с подверженной компетенцией в Веб-дизайне и разработки по стандартам Ворлдскиллс Россия.</p>
                            <Link href="/about">
                                <a href="">Узнать больше</a>
                            </Link>
                        </div>
                    </div>
                    <div className={clsx(styles.introduction__box)}>4</div>
                </div>
            </div>
)
};