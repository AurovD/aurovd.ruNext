import React from 'react';
import styles from './Create.module.scss';
import {Formik, Field, Form, FormikHelpers, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import clsx from "clsx";


interface Values {
    title: string;
    description: string;
    link?: string;
    github?: string;
    password: string;
    previews: FileList | null;
}

// https://codesandbox.io/s/lkkjpr5r7?file=/index.js


const setPost = async (body: FormData) => {
    return await fetch("http://localhost:3001/post", {
        method: "post",
        body
    });
}

// React-toastify
// https://codesandbox.io/s/formik-v2-tutorial-added-textarea-ujz18


export const CreateProject = () => {
    return (
        <div className={'d-flex justify-content-start align-items-center ml-40'}>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    link: '',
                    github: '',
                    password: '',
                    new_password: '',
                    previews: null
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .max(30, 'Must be 15 characters or less')
                        .required('Required Title'),
                    description: Yup.string()
                        .required('Required'),
                    password: Yup.string()
                        .required('Required'),
                    previews: Yup.mixed()
                        .required('Required')
                })}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    const fd = new FormData();
                    Array.from(values.previews).forEach(file => {
                        fd.append('preview', file);
                    });
                    for (let k in values) {
                        fd.append(k, typeof values[k] === "string" ? values[k] : JSON.stringify(values[k]));
                    }
                    setSubmitting(false);
                    setPost(fd).then(async (r: any) => {
                        r = await r.json();
                        console.log(r)
                    });
                }}>
                {(formProps) => (
                    <Form className={clsx('d-flex flex-column justify-content-between', styles.form)}>
                        <div className={clsx('d-flex flex-column relative', styles.form_input)}>
                            {/*<label htmlFor="title">Title</label>*/}
                            <Field id="title" name="title" placeholder="Название проекта" />
                            {/*<ErrorMessage name="title" />*/}
                        </div>

                        <label htmlFor="desc">Description</label>
                        <Field id="desc" name="description" placeholder="Описание"/>
                        <ErrorMessage name="description" />

                        <label htmlFor="github">GitHub link</label>
                        <Field id="github" name="github" placeholder="" />

                        <label htmlFor="link">Link</label>
                        <Field id="link" name="link" placeholder="Link" />

                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" placeholder="Password" type="password" />
                        <ErrorMessage name="password" />

                        <label htmlFor="new_password">New Password</label>
                        <Field id="new_password" name="new_password" placeholder="New password" type="password" />

                        <input
                            type="file"
                            name="previews"
                            onChange={(event) =>{
                                formProps.setFieldValue("previews", event.target.files);
                            }}
                            multiple
                        />
                        <ErrorMessage name="previews" />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};