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
import {Toast} from "../UI/Toast";


interface Project {
    project: IProjects;
}

export const Edit: React.FC< Project > = ({project}) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [images, setImages] = useState<string[]>(project.images);
    const [msg, setMsg] = useState({
        msg: '',
        status: null
    });

    const deleteImage = async (image, id) => {
        await Axios.post(`/delete_image`, {
            id,
            image,
        }).then(res => {
            setImages(prev => prev.filter(imageName => imageName !== image));
            if(res.data.message && res.status){
                setMsg({msg: res.data.message, status: res.status});
                setTimeout(() => {
                    setMsg({
                        msg: '',
                        status: null
                    });
                }, 5000);
            }
        })
            .catch(e => {
                const error =
                    e.response?.data?.message ||
                    "Ошибка сервера";
                setMsg({ msg: error, status: e.response?.status || 500 });
                setTimeout(() => setMsg({ msg: "", status: null }), 5000);
        })
    }
    return (
        <div className={'d-flex justify-content-start'}>
            <div className={clsx(styles.project_images)}>
                {Array.isArray(images)  && <div className={clsx("wrapper", styles.previews_grid)}>
                    {images.map(image =>
                        <div className={clsx(styles.previews_box)} key={image}>
                            <div className={clsx(styles.cross)} onClick={event => {
                                event.stopPropagation();
                                deleteImage(image, project.id);
                            }}>Удалить</div>
                            <Image className={clsx(styles.box_image)} src={"/projects/" + image} alt={image}
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
                                if(Array.isArray(res.new_images) ){
                                    setImages([...images, ...res.new_images]);
                                }
                                setMsg({msg: res.msg, status: res.status});
                                setTimeout(() => {
                                    setMsg({
                                        msg: '',
                                        status: null
                                    });
                                }, 5000);
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
            {msg.status && <Toast msg={msg.msg} status={msg.status}/>}
        </div>
    )
};