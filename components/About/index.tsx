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
                <h3 className="mb-20">ОБРАЗОВАНИЕ</h3>
                <div className={clsx("d-grid", styles.items)}>
                    <div className={clsx( styles.item, styles.mgmsu)}>
                        <div className={clsx(styles.item__header)}>
                            <img src="/assets/mgmsu.svg" alt=""/>
                        </div>
                        <div className={clsx(styles.item__info)}>
                            <div className={clsx(styles.info__content)}>
                                <div className={clsx(styles.content__years)}>
                                    <div>2008</div>
                                    <div>2013</div>
                                </div>
                                <div className={clsx("d-flex flex-column", styles.content__headers)}>
                                    <h5>Клинический психолог</h5>
                                    <p>Медицинская психология и психотерапия</p>
                                </div>
                                <a className={clsx(styles.content__link)} href="https://www.msmsu.ru/obrazovanie/student/studentu/facultet/fakultet_klinicheskoy_psikhologii/about/">подробнее</a>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.item__header)}>
                            <img src="/assets/ithublogo.gif" alt=""/>
                        </div>
                        <div className={clsx(styles.item__info)}>
                            <div className={clsx(styles.info__content)}>
                                <div className={clsx(styles.content__years)}>
                                    <div>2018</div>
                                    <div>2021</div>
                                </div>
                                <div className={clsx("d-flex flex-column", styles.content__headers)}>
                                    <h5>Веб-разработчик</h5>
                                    <p>JS, React, Node, HTML, CSS</p>
                                </div>
                                <a className={clsx(styles.content__link)} href="https://ithub.ru/">подробнее</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx("sticky", styles.experience)}>
                <h3>ОПЫТ</h3>
                <div className={clsx("d-flex flex-column")}>
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        <Link href={"https://ithub.ru/"}>
                            <div className={clsx(styles.hover, styles.logo_exp)}>
                                <img src="/assets/ithublogo.gif" alt=""/>
                            </div>
                        </Link>
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ItHub College</h5>
                                <p>Преподаватель</p>
                            </div>
                            <p>Преподавание основ тестирования веб-приложений</p>
                        </div>
                    </div>
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        <Link href={"https://www.croc.ru/"}>
                            <div className={clsx(styles.hover, styles.logo_exp)}>
                                <img src="/assets/croc.svg" alt=""/>
                            </div>
                        </Link>
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ЗАО «КРОК инкорпорейтед»</h5>
                                <p>Техник-тестировщик</p>
                            </div>

                            <p>Осуществлял техподдержку и тестирование комплексов обработки избирательных бюллетеней на всех этапах при подготовке к выборам 2019 года, от сборки до техподдержки по время голосования.</p>
                        </div>
                    </div>
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        <div className={clsx(styles.hover, styles.logo_exp)}>
                            <img src="/assets/ps.svg" alt=""/>
                        </div>
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ProfiSourcing</h5>
                                <p>Ресечер (Ассистент менеджера по подбору персонала)</p>
                            </div>

                            <p>Помогал менеджеру по подбору персонала в поиске кандидатов, просматривал резюме и проводил первичное собеседование. Оптимизировал процесс поиска кандидатов и обработки резюме, что ускорило работу в 2 раза.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};