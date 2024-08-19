import Panel from "../../components/Panel";
import Head from "next/head";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import ProjectPreview from "../../components/UI/ProjectPreview";
import {ProjectDescription} from "../../components/UI/ProjectDescription";
import {Task} from "../../components/UI/Task";
import {DescriptionLinks} from "../../components/UI/DescriptionLinks";
import {GetServerSideProps} from "next";
import {getCookies} from "cookies-next";
import Link from "next/link";
import React, {useEffect} from "react";
import clsx from "clsx";
import {TagCard} from "../../components/UI/TagCard";
import {useProject} from "../../store/project";

export default function ProjectPage({projectId, user}) {

    const [loadProject, project] = useProject(state => [
        state.loadProject,
        state.project
    ]);

    useEffect(() => {
        loadProject(projectId);
    }, []);


    const obj = {
        title: project.title,
        tags: project.Tags
    }

    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{project.title}</title>
                <meta name="author" content="Аюров Дмитрий"/>
                <meta name="robots" content="index, follow"/>
                <link rel="canonical" href={`https://www.aurovdm.ru/project ${project.id}`}/>
                <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                <meta property="og:title" content={`${project.title} | Аюров Дмитрий | Веб разработка | Портфолио`}/>
                <meta property="og:description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta property="og:url" content={`https://www.aurovdm.ru/project ${project.id}`}/>
                <meta name="description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                <meta name="keywords" content={`Аюров Дмитрий, веб разработка, портфолио, web development, web developer, проекты, работы, backend, frontend, резюме, ${project.title}`}/>
            </Head>
            <Panel {...obj}/>
            <div className="relative">
                {user && <Link className={"link_update"} href={`/update/` + project.id}>Изменить</Link>}
                {project.images && project.images.map((image, index) => <ProjectPreview image={image} key={index}/>)}
                <Task title={project.task}  color={"#fff"}/>
                <ProjectDescription description={project.description}/>
                {project?.Tags &&  <div className={clsx("sticky tags about_block")}>
                    {project?.Tags.length > 0 && <h3>Технологии</h3>}
                    <div className={clsx("d-flex tags_list")}>
                        {project?.Tags.map((tag, index) =>
                            <TagCard key={tag.title} title={tag.title} />
                        )}
                    </div>
                </div>}
                {project.github && <DescriptionLinks link={project.github} title={"GitHub"}/>}
                {project.link && <DescriptionLinks link={project.link} title={"Сайт"}/>}
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const projectId = ctx.query.project;

        let user = getCookies(ctx).token || null;
        return {
            props: {
                projectId,
                user
            },
        }
    } catch (error) {
        return {
            props: {},
            redirect: {
                destination: '/projects',
                permanent: false
            }
        }
    }
};