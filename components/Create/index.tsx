import React, {useState} from 'react';
import styles from './Create.module.scss';
import {Formik, Form, FormikHelpers, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";
import {MyTextInput} from "../UI/Forms/TextInput";
import {MyTextArea} from "../UI/Forms/TextArea";
import {IProject} from "../../types/types";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../api/index";
import {Toast} from "../UI/Toast";
import {MyDropzone} from "../UI/MyDropZone";

export const CreateProject = () => {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [msg, setMsg] = useState({
        msg: 'Добавлено',
        status: null
    });

    return (
        <div className={'d-flex justify-content-start'}>
            <Formik
                initialValues={{
                    title: "",
                    task: "",
                    description: "",
                    tags: '',
                    link: '',
                    github: '',
                    previews: acceptedFiles
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(30, 'Небольше 30 символов')
                        .required('Требуется название проекта'),
                    task: Yup.string()
                        .required('Требуется задача проекта'),
                    description: Yup.string()
                        .required('Требуется описание проекта'),
                    tags: Yup.string()
                        .trim()
                        .matches(/\B#[a-z0-9_]+/g, "Требуется знак # перед тэгом")
                })}
                onSubmit={(
                    values: IProject,
                    { setSubmitting }: FormikHelpers<IProject>
                ) => {
                    const fd = new FormData();
                    for (let k in values) {
                        fd.append(k, typeof values[k] === "string" ? values[k] : JSON.stringify(values[k]));
                    }
                    Array.from(values.previews).forEach((file: string | Blob) => {
                        fd.append('preview', file);
                    });
                    setSubmitting(false);
                    ProjectsApi(Axios).createProject(fd)
                        .then(async (res: { msg: string, status?: number }) => {
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
                        <MyTextInput label="Название проекта*" name="title" type="text" placeholder="Портфолио"/>
                        <MyTextInput label="Задача проекта" name="task" type="text" placeholder="Сделать что-нибудь"/>
                        <MyTextArea label="Description*" name="description" placeholder="Description"/>
                        <MyTextInput label="Тэги" name="tags" type="text" placeholder="node.js javascript"/>
                        <MyTextInput label="Ссылка на Github" name="github" type="text" placeholder="https://github.com/AurovD/aurovd.ruNext"/>
                        <MyTextInput label="Ссылка на проект" name="link" type="text" placeholder="https://aurovd.ru/"/>
                        <MyDropzone acceptedFiles={acceptedFiles} setAcceptedFiles={setAcceptedFiles} setFieldValue={formProps.setFieldValue}/>
                        <ErrorMessage name="previews" />
                        <button type="submit">Добавить проект</button>
                        {msg.status && <Toast msg={msg.msg} status={msg.status}/>}
                    </Form>
                )}
            </Formik>
        </div>
    )
};
