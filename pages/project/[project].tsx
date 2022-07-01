import Panel from "../../components/Panel";
import Head from "next/head";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import ProjectPreview from "../../components/UI/ProjectPreview";
import {ProjectDescription} from "../../components/UI/ProjectDescription";

export default function ProjectPage({project}) {
    const obj = {
        title: project.title,
        tags: project.Tags
    }

    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Aurov Dmitry - Portfolio</title>
            </Head>
            <Panel {...obj}/>
            <div>
                {project.images && project.images.map((image, index) => <ProjectPreview image={image} key={index}/>)}
                <ProjectDescription description={project}/>
            </div>
        </div>
    )
}

// @ts-ignore
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const projectId = ctx.query.project;
        const project = await ProjectsApi(Axios).getProject(projectId as string);
        return {
            props: {
                project
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