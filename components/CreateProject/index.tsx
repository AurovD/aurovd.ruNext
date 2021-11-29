import React from 'react';
import styles from './CreateProject.module.scss';
import { Formik, Field, Form, FormikHelpers } from 'formik';

interface Values {
    title: string;
    description: string;
    link?: string;
    github?: string;
    password: string;
    files: FileList;
}

// https://codesandbox.io/s/lkkjpr5r7?file=/index.js


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
                    files: null
                }}
                onSubmit={(
                    values: Values,
                    { setSubmitting }: FormikHelpers<Values>
                ) => {
                    console.log(values, setSubmitting)
                    // setTimeout(() => {
                    //     alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    // }, 500);
                }}>

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
                    <Field id="password" name="password" placeholder="Password" type="password"/>

                    <input
                        type="file"
                        name="file"
                        onChange={(event) =>{
                            setFieldValue("photo1", event.target.files[0]);
                        }}
                    />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    )
};