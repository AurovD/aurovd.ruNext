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


// interface Values {
//     title: string;
//     description: string;
//     link?: string;
//     github?: string;
//     password: string;
//     previews: FileList | null;
// }


// const setPost = async (body: FormData) => {
//     return await fetch("http://localhost:3001/project", {
//         method: "post",
//         body
//     });
// }


export const CreateProject = () => {
    const [files, setFiles] = useState<string>("Выбрать файлы");


    const filesHandle = (files: FileList) => {
        let str = "Выбранные файлы: ";
        str += Array.from(files).map(img => img.name).join(", ");
        setFiles(str);
    }

    return (
        <div className={'d-flex justify-content-start ml-40 mb-50'}>
            <Formik
                initialValues={{
                    title: 'test',
                    description: 'test',
                    link: '',
                    github: '',
                    password: '123',
                    new_password: '',
                    previews: null
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(30, 'Must be 15 characters or less')
                        .required('Требуется название проекта'),
                    description: Yup.string()
                        .required('Требуется описание проекта'),
                    password: Yup.string()
                        .required('Требуется идентификация по паролю'),
                    previews: Yup.mixed()
                        .required('Требуется превью проекта')
                })}
                onSubmit={(
                    values: IProject,
                    { setSubmitting }: FormikHelpers<IProject>
                ) => {
                    setFiles("Выбрать файлы");
                    const fd = new FormData();
                    Array.from(values.previews).forEach(file => {
                        fd.append('preview', file);
                    });
                    for (let k in values) {
                        fd.append(k, typeof values[k] === "string" ? values[k] : JSON.stringify(values[k]));
                    }
                    setSubmitting(false);
                    ProjectsApi(Axios).createProject(fd).then(async (r: any) => {
                            // r = await r.json();
                            console.log(r)
                    });
                }}>
                {(formProps) => (
                    <Form className={clsx('d-flex flex-column', styles.form)}>
                        <MyTextInput label="Название проекта*" name="title" type="text" placeholder="Портфолио"/>
                        <MyTextArea label="Description*" name="description" placeholder="Description"/>
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
                    </Form>
                )}
            </Formik>
        </div>
    )
};