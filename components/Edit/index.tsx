import clsx from "clsx";
import React, {MouseEventHandler, useState} from "react";
import {IProject, IProjects, ProjectReq} from "../../types/types";
import {MyDropzone} from "../UI/MyDropZone";
import styles from './Edit.module.scss';
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import {Axios as AxiosFD} from "../../api/index";
import Image from "next/image";


interface Project {
    project: IProjects;
}

export const Edit: React.FC< Project > = ({project}) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    // const [msg, setMsg] = useState({
    //     msg: 'Добавлено',
    //     status: null
    // });
    console.log(project)

    const deleteImage = async (image, id) => {
        await Axios.post(`/delete_image`, {
            id,
            image,
        }).catch(e => {
            console.log(e)
        })
    }
    return (
        <div className={'d-flex justify-content-start'}>
            <div className={clsx(styles.project_images)}>
                {Array.isArray(project.images)  && <div className={clsx("wrapper", styles.previews_grid)}>
                    {project.images.map(image =>
                        <div className={clsx(styles.previews_box)} key={image}>
                            <div className={clsx(styles.cross)} onClick={event => {
                                event.stopPropagation();
                                deleteImage(image, project.id);
                            }}>Удалить</div>
                            <Image className={clsx(styles.box_image)} src={"/projects_images/" + image} alt={image}
                                   width={400} height={400}
                            />
                        </div>)}
                </div>}
                <Formik
                    initialValues={{
                        previews: acceptedFiles
                    }}
                    onSubmit={(
                        values: { previews: any[]; },
                        { setSubmitting }: FormikHelpers<IProject>
                    ) => {
                        const fd = new FormData();
                        Array.from(values.previews).forEach((file: string | Blob) => {
                            fd.append('preview', file);
                        });
                        setSubmitting(false);
                        ProjectsApi(AxiosFD).addImage(fd, project.id)
                            .then(res => {
                                console.log(res);
                            })
                    }}>
                    {(formProps) => (
                        <Form className={clsx('d-flex flex-column form')}>
                            <MyDropzone acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} setFieldValue={formProps.setFieldValue}/>
                            <ErrorMessage name="previews" />
                            <button type="submit">Изменить галерею</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};