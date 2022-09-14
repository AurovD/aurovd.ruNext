import React, {useState} from 'react';
import styles from './Create.module.scss';
import {Formik, Form, FormikHelpers, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";
import {MyTextInput} from "../UI/Forms/TextInput";
import {MyTextArea} from "../UI/Forms/TextArea";
import {IProject} from "../../types/types";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import {Toast} from "../UI/Toast";


export const CreateProject = () => {
    const [files, setFiles] = useState<string>("Выбрать файлы");
    const [msg, setMsg] = useState({
        msg: 'Добавлено',
        status: null
    });


    const filesHandle = (files: FileList) => {
        let str = "Выбранные файлы: ";
        str += Array.from(files).map(img => img.name).join(", ");
        setFiles(str);
    }

    const sendBody = (body, setSubmitting) => {
        setFiles("Выбрать файлы: ");
        const fd = new FormData();
        for (let k in body) {
            fd.append(k, typeof body[k] === "string" ? body[k] : JSON.stringify(body[k]));
        }
        Array.from(body.previews).forEach((file: string | Blob) => {
            fd.append('preview', file);
        });
        setSubmitting(false);
        ProjectsApi(Axios).createProject(fd)
            .then(async (res: { msg: string, status?: number }) => {
                setMsg({msg: res.msg || "Ошибка", status: res.status});
                setTimeout(() => {
                    setMsg({
                        msg: '',
                        status: null
                    });
                }, 5000);
            });
    }

    return (
        <div className={'d-flex justify-content-start'}>
            <Formik
                initialValues={{
                    title: 'Test js',
                    task: 'Сделать что-нибудь',
                    description: 'test',
                    tags: '#js #facebook #good',
                    link: '',
                    github: '',
                    password: '123',
                    new_password: '',
                    previews: null
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
                        .matches(/\B#[a-z0-9_]+/g, "Требуется знак # перед тэгом"),
                    password: Yup.string()
                        .required('Требуется идентификация по паролю'),
                    previews: Yup.mixed()
                        .required('Требуется превью проекта')
                })}
                onSubmit={(
                    values: IProject,
                    { setSubmitting }: FormikHelpers<IProject>
                ) => {
                    ProjectsApi(Axios).check(values.password)
                        .then(() => sendBody(values, setSubmitting))
                        .catch((res) => {
                            setMsg({msg: res.response.data.msg || "Ошибка", status: res.response.status});
                            setTimeout(() => {
                                setMsg({
                                    msg: '',
                                    status: null
                                });
                            }, 5000);
                        })
                }}>
                {(formProps) => (
                    <Form className={clsx('d-flex flex-column', styles.form)}>
                        <MyTextInput label="Название проекта*" name="title" type="text" placeholder="Портфолио"/>
                        <MyTextInput label="Задача проекта" name="task" type="text" placeholder="Сделать что-нибудь"/>
                        <MyTextArea label="Description*" name="description" placeholder="Description"/>
                        <MyTextInput label="Тэги" name="tags" type="text" placeholder="node.js javascript"/>
                        <MyTextInput label="Ссылка на Github" name="github" type="text" placeholder="https://github.com/AurovD/aurovd.ruNext"/>
                        <MyTextInput label="Ссылка на проект" name="link" type="text" placeholder="https://aurovd.ru/"/>
                        <MyTextInput label="Пароль*" name="password" type="password" placeholder="**********"/>
                        <MyTextInput label="Изменить пароль" name="new_password" type="password" placeholder="**********"/>
                        <label htmlFor="previews" className={clsx(styles.label)}>
                            {/*{!files.length ? "Выбрать файлы" : `Выбранные файлы: ${files.join(", ")}.`}*/}
                            {files}
                        </label>
                        <input
                            id="previews"
                            type="file"
                            name="previews"
                            onChange={(event) =>{
                                formProps.setFieldValue("previews", event.target.files);
                                filesHandle(event.target.files);
                            }}
                            className={clsx(styles.files)}
                            multiple
                        />
                        <ErrorMessage name="previews" />

                        <button type="submit">Добавить проект</button>
                        {msg.status && <Toast msg={msg.msg} status={msg.status}/>}
                    </Form>
                )}
            </Formik>
        </div>
    )
};