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

export default function ProjectPage({project, user}) {
    const obj = {
        title: project.title,
        tags: project.Tags
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>{project.title}</title>
            </Head>
            <Panel {...obj}/>
            <div className="relative">
                {user && <Link className={"link_update"} href={`/update/` + project.id}>Изменить</Link>}
                {project.images && project.images.map((image, index) => <ProjectPreview image={image} key={index}/>)}
                <Task title={project.task}  color={"#fff"}/>
                <ProjectDescription description={project.description}/>
                {project.github && <DescriptionLinks link={project.github} title={"GitHub"}/>}
                {project.link && <DescriptionLinks link={project.link} title={"Сайт"}/>}
            </div>
        </div>
    )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const projectId = ctx.query.project;
        const project = await ProjectsApi(Axios).getProject(projectId as string);

        let user = getCookies(ctx).token || null;
        return {
            props: {
                project,
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