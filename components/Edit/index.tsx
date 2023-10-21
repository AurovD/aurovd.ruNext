import clsx from "clsx";
import React, {useState} from "react";
import {IProject, IProjects} from "../../types/types";
import {MyDropzone} from "../UI/MyDropZone";
import styles from './Edit.module.scss';
import {ErrorMessage, Form, Formik, FormikHelpers} from "formik";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import {Axios as AxiosFD} from "../../api/index";
import {Toast} from "../UI/Toast";
import {MyTextInput} from "../UI/Forms/TextInput";
import {MyTextArea} from "../UI/Forms/TextArea";
import * as Yup from "yup";
import router from "next/router";


interface Project {
    project: IProjects;
}
interface Images{
    previews: any[]
}

export const Edit: React.FC< Project > = ({project}) => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [images, setImages] = useState<string[]>(project.images);
    const [tags, setTags] = useState<string>(project.Tags.map(tag => tag.title).join(" "));
    const [msg, setMsg] = useState({
        msg: '',
        status: null
    });

    const handleDelete = () => {
        let isDelete = confirm("Delete?");
        if(isDelete) {
            ProjectsApi(Axios).delete(project.id, tags, images)
                .then(async(res) => {
                    if(res.msg){
                        setMsg({msg: res.msg, status: res.status});
                        setTimeout(() => {
                            setMsg({
                                msg: '',
                                status: null
                            });
                        }, 5000);
                    } else {
                        await router.push('/');
                    }
                })
        }

    }

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
        <div className={'d-flex flex-column'}>
            <div className={clsx(styles.project_images)}>
                {Array.isArray(images)  && <div className={clsx("wrapper", styles.previews_grid)}>
                    {images.map(image =>
                        <div className={clsx(styles.previews_box)} key={image}>
                            <div className={clsx(styles.cross)} onClick={event => {
                                event.stopPropagation();
                                deleteImage(image, project.id);
                            }}>Удалить</div>
                            {/*<img className={clsx(styles.box_image)} src={'/projects/preview-' + image + '-600.jpg'} alt={image}/>*/}
                            <img className={clsx(styles.box_image)} src={"https://aurovdm.ru/images/preview-" + image + '-600.jpg'} alt={image}/>
                        </div>)}
                </div>}
                <Formik
                    initialValues={{
                        previews: acceptedFiles
                    }}
                    onSubmit={(
                        values: { previews: any[]; },
                        { setSubmitting }: FormikHelpers<Images>
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
            <div>
                <Formik
                    initialValues={{
                        title: project.title,
                        task: project.task,
                        description: project.description,
                        link: project.link,
                        github: project.github,
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .max(30, 'Небольше 30 символов'),
                        task: Yup.string(),
                        description: Yup.string(),
                    })}
                    onSubmit={(
                        values: IProject,
                        { setSubmitting }: FormikHelpers<IProject>
                    ) => {
                        setSubmitting(false);
                        ProjectsApi(Axios).changeProject(values, project.id)
                            .then(async(res) => {
                                if(res.msg){
                                    setMsg({msg: res.msg, status: res.status});
                                    setTimeout(() => {
                                        setMsg({
                                            msg: '',
                                            status: null
                                        });
                                    }, 5000);
                                } else {
                                    await router.push('/project/' + project.id);
                                }
                            })
                    }}>
                    {() => (
                        <Form className={clsx('d-flex flex-column form')}>
                            <MyTextInput label="Название проекта" name="title" type="text" placeholder="Портфолио"/>
                            <MyTextInput label="Задача проекта" name="task" type="text" placeholder="Сделать что-нибудь"/>
                            <MyTextArea label="Description" name="description" placeholder="Description"/>
                            <MyTextInput label="Ссылка на Github" name="github" type="text" placeholder="https://github.com/AurovD/aurovd.ruNext"/>
                            <MyTextInput label="Ссылка на проект" name="link" type="text" placeholder="https://aurovd.ru/"/>
                            <button type="submit">Изменить</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div>
                <Formik
                    initialValues={{
                        tags: tags,
                        old_tags: project.Tags.map(tag => tag.title),
                    }}
                    validationSchema={Yup.object({
                        tags: Yup.string()
                            .trim()
                            .matches(/\B#[a-z0-9_]+/g, "Требуется знак # перед тэгом")
                    })}
                    onSubmit={(
                        values: { tags: string; old_tags: string[];},
                        { resetForm }: FormikHelpers<{ tags: string; old_tags: string[]; }>
                        // { setSubmitting }: FormikHelpers<Images>
                    ) => {
                        // setSubmitting(false);
                        ProjectsApi(Axios).changeTags(values, project.id)
                            .then(async(res) => {
                                if(res.msg){
                                    const updatedInitialValues = {
                                        tags: values.tags,
                                        old_tags: values.tags.split(" ")
                                    };
                                    resetForm({ values: updatedInitialValues });
                                    setTags(values.tags);
                                    setMsg({msg: res.msg, status: res.status});
                                    setTimeout(() => {
                                        setMsg({
                                            msg: '',
                                            status: null
                                        });
                                    }, 5000);
                                }
                            })
                    }}>
                    {() => (
                        <Form className={clsx('d-flex flex-column form')}>
                            <MyTextInput label="Тэги" name="tags" type="text" placeholder="node.js javascript"/>
                            <button type="submit">Изменить</button>
                        </Form>
                    )}
                </Formik>
            </div>
            <div className={clsx('d-flex flex-column form')}>
                    <button onClick={handleDelete}>Удалить</button>
            </div>
            {msg.status && <Toast msg={msg.msg} status={msg.status}/>}
        </div>
    )
};