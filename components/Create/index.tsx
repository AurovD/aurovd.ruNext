import React from 'react';
import styles from './Create.module.scss';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import {log} from "util";

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


export const CreateProject = () => {
    return (
        <div className={'d-flex justify-content-center align-items-center'}>
            <Formik
                initialValues={{
                    title: '',
                    description: '',
                    link: '',
                    github: '',
                    password: '',
                    previews: null
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    console.log(values)
                    const fd = new FormData();
                    Array.from(values.previews).forEach(file => {
                        fd.append('preview', file);
                    });
                    for (let k in values) {
                        fd.append(k, typeof values[k] === "string" ? values[k] : JSON.stringify(values[k]));
                    }
                    setSubmitting(false);
                    setPost(fd).then((r: any) => console.log(r));
                }}>
                {(formProps) => (
                    <Form className={'d-flex flex-column'}>
                        <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Название проекта" />

                        <label htmlFor="desc">Description</label>
                        <Field id="desc" name="description" placeholder="Описание" />

                        <label htmlFor="github">GitHub link</label>
                        <Field id="github" name="github" placeholder="" />

                        <label htmlFor="link">Link</label>
                        <Field id="link" name="link" placeholder="Link" />

                        <label htmlFor="password">Password</label>
                        <Field id="password" name="password" placeholder="Password" type="password" />

                        <input
                            type="file"
                            name="previews"
                            onChange={(event) =>{
                                formProps.setFieldValue("previews", event.target.files);
                            }}
                            multiple
                        />

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
};