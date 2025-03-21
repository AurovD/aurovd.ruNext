import React, {useState} from 'react';
import styles from './About.module.scss';
import clsx from "clsx";
import Link from "next/link";
import {Tags} from "../../types/types";
import router from "next/router";
import ProjectCard from "../ProjectCard";
import {TagCard} from "../UI/TagCard";


interface TagsData{
    stat: { tags: Array<Tags>, count: {count: number}, lastImg: string, lastId: number }
}

export const About: React.FC<TagsData> = ({stat}) => {
    const [error, setError] = useState(false);
    // const [loading, setLoading] = useState(true);
    const handleClick = async () => {
        await router.push('/project/' + stat.lastId);
    }

    return (
        <div className={clsx(styles.about)}>
            <div className={clsx(styles.introduction__bg)}>
                <div className={clsx(styles.introduction__bg_dark)}></div>
            </div>
            <div className={clsx("sticky", styles.introduction, styles.about_block)}>
                <div className={clsx(styles.introduction__content)}>
                    <div className={clsx("mb-30", styles.introduction__header)}>
                        <h3>ДМИТРИЙ</h3>
                        <h3>АЮРОВ</h3>
                        <h3>ВЕБ-РАЗРАБОТЧИК</h3>
                    </div>
                    <p>Занимаюсь разработкой несколько лет и готов реализовать Ваши идеи в осмысленное, изящное и красивое воплощение, которые привлечет клиентов и повысит конверсию. Для начала работы и сотрудничества  нам надо поговорить, так что кликайте на одну  из ссылок ниже</p>
                    <div className={clsx("d-flex mt-30", styles.introduction__contacts)}>
                        <Link  href={"https://t.me/aurovdm"}>
                            TELEGRAM
                        </Link>
                        <Link  href={"https://www.linkedin.com/in/aurovdmitry/"}>
                            LINKEDIN
                        </Link>
                        <Link  href={"https://wa.me/79313861102"}>
                            WHATSUP
                        </Link>
                        <Link  href={"https://github.com/AurovD"}>
                            GITHUB
                        </Link>
                    </div>
                </div>
            </div>
            <div className={clsx("sticky", styles.education, styles.about_block)}>
                <h3 className="mb-20">ОБРАЗОВАНИЕ</h3>
                <div className={clsx("d-grid", styles.items)}>
                    <div className={clsx( styles.item, styles.mgmsu)}>
                        <div className={clsx(styles.item__info)}>
                            <div className={clsx(styles.info__logo)}>
                                <img src="/assets/mgmsu.svg" alt="mgmsu"/>
                            </div>
                            <div className={clsx(styles.info__content)}>
                                <div className={clsx(styles.content__years)}>
                                    <div>2008</div>
                                    <div>2013</div>
                                </div>
                                <div className={clsx("d-flex flex-column", styles.content__headers)}>
                                    <h5>Клинический психолог</h5>
                                    <p>Медицинская психология и психотерапия</p>
                                </div>
                                <Link className={clsx(styles.content__link)} href="https://www.msmsu.ru/obrazovanie/student/studentu/facultet/fakultet_klinicheskoy_psikhologii/about/">подробнее</Link>
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.item)}>
                        <div className={clsx(styles.item__info)}>
                            <div className={clsx(styles.info__logo)}>
                                <img src="/assets/ithublogo.gif" alt="ithub"/>
                            </div>
                            <div className={clsx(styles.info__content)}>
                                <div className={clsx(styles.content__years)}>
                                    <div>2018</div>
                                    <div>2021</div>
                                </div>
                                <div className={clsx("d-flex flex-column", styles.content__headers)}>
                                    <h5>Веб-разработчик</h5>
                                    <p>JS, React, Node, HTML, CSS</p>
                                </div>
                                <Link className={clsx(styles.content__link)} href="https://ithub.ru/">подробнее</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={clsx("sticky", styles.experience, styles.about_block)}>
                <h3>ОПЫТ</h3>
                <div className={clsx("d-flex flex-column")}>
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        <div className={clsx(styles.hover, styles.logo_exp)}>
                            <img src="/assets/freelancer.png" alt="freelancer"/>
                        </div>
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ITHub Group</h5>
                                <p>Fullstack/Frontend/Backend - разработчик</p>
                            </div>
                        </div>
                    </div>
                    {/*<div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>*/}
                    {/*    <div className={clsx(styles.hover, styles.logo_exp)}>*/}
                    {/*        <img src="/assets/ozon.png" alt="ozon"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={clsx(styles.hover, styles.info_exp)}>*/}
                    {/*        <div>*/}
                    {/*            <h5>ООО «Интернет Решения»</h5>*/}
                    {/*            <p>Оператор слада/ Товаровед по электронике</p>*/}
                    {/*        </div>*/}

                    {/*        /!*<p>Помогал менеджеру по подбору персонала в поиске кандидатов, просматривал резюме и проводил первичное собеседование. Оптимизировал процесс поиска кандидатов и обработки резюме, что ускорило работу в 2 раза.</p>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        {/*<Link href={"https://ithub.ru/"}>*/}
                            <div className={clsx(styles.hover, styles.logo_exp)}>
                                <img src="/assets/ithublogo.gif" alt="ithub"/>
                            </div>
                        {/*</Link>*/}
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ItHub College</h5>
                                <p>Преподаватель</p>
                            </div>
                            {/*<p>Преподавание основ тестирования веб-приложений</p>*/}
                        </div>
                    </div>
                    <div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>
                        {/*<Link href={"https://www.croc.ru/"}>*/}
                            <div className={clsx(styles.hover, styles.logo_exp)}>
                                <img src="/assets/croc.svg" alt="croc"/>
                            </div>
                        {/*</Link>*/}
                        <div className={clsx(styles.hover, styles.info_exp)}>
                            <div>
                                <h5>ЗАО «КРОК инкорпорейтед»</h5>
                                <p>Техник-тестировщик</p>
                            </div>

                            {/*<p>Осуществлял техподдержку и тестирование комплексов обработки избирательных бюллетеней на всех этапах при подготовке к выборам 2019 года, от сборки до техподдержки по время голосования.</p>*/}
                        </div>
                    </div>
                    {/*<div className={clsx("d-flex justify-content-between mt-20", styles.item__exp)}>*/}
                    {/*    <div className={clsx(styles.hover, styles.logo_exp)}>*/}
                    {/*        <img src="/assets/ps.svg" alt="ps"/>*/}
                    {/*    </div>*/}
                    {/*    <div className={clsx(styles.hover, styles.info_exp)}>*/}
                    {/*        <div>*/}
                    {/*            <h5>ProfiSourcing</h5>*/}
                    {/*            <p>Ресечер</p>*/}
                    {/*        </div>*/}

                    {/*        /!*<p>Помогал менеджеру по подбору персонала в поиске кандидатов, просматривал резюме и проводил первичное собеседование. Оптимизировал процесс поиска кандидатов и обработки резюме, что ускорило работу в 2 раза.</p>*!/*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className={clsx("d-flex mt-20", styles.cv_block)}>
                            <Link href={"/CV.pdf"} className={clsx( styles.cv_link)}>Открыть CV</Link>
                    </div>
                </div>
            </div>
            {stat?.count.count && <div className={clsx("sticky", styles.last_project)} onClick={handleClick}>
                {/*<h3>{stat.count.count} {stat.count.count > 5 ? "проектов" : "проекта"}</h3>*/}
                <img src={
                    // error ? "/assets/no_image.png" : '/projects/preview-' + stat.lastImg + '-1000.jpg'}
                    error ? "/assets/no_image.png" : "https://aurovdm.ru/images/preview-" + stat.lastImg + '-1000.jpg'}
                       alt={stat.lastImg}
                       onError={() => setError(true)}
                       className={clsx(styles.image_preview)}
                />
            </div>}
            {stat?.tags &&  <div className={clsx("sticky", styles.tags, styles.about_block)}>
                {stat.tags.length > 0 && <h3>Технологии</h3>}
                <div className={clsx("d-flex", styles.tags_list)}>
                    <TagCard count={stat.count.count} title={"Все проекты"}/>
                    {stat.tags.map((tag, index) =>
                        <TagCard key={tag.Tag.title} count={tag.count_of_tags} title={tag.Tag.title} />
                    )}
                </div>
            </div>}
            <div className={clsx("sticky", styles.sertiport_box)}>
                <h3>Сертификаты</h3>
                <div className={clsx(styles.sertiport_grid)}>
                    <ProjectCard image={"/assets/cert1.png"} title={ "Office Word 2016"}/>
                    <ProjectCard image={"/assets/cert2.png"} title= {"HTML and CSS"}/>
                    <ProjectCard image={"/assets/cert3.png"} title= {"JavaScript"}/>
                    <ProjectCard image={"/assets/cert4.PNG"} title= {"WorldSkills"}/>
                </div>
            </div>
        </div>
    )
};