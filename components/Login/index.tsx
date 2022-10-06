import React from 'react';
import styles from './Login.module.scss';
import clsx from "clsx";
import {NextPage} from "next";
import {Form, Formik, FormikHelpers} from "formik";
import * as Yup from "yup";
import {ProjectsApi} from "../../api/ProjectsApi";
import {Axios} from "../../axios/axios";
import {MyTextInput} from "../UI/Forms/TextInput";
import router from 'next/router';

export const Login: NextPage = () => {
    return (
        <div className={clsx("d-flex justify-content align-items-center", styles.login_wrapper)}>
                <Formik
                    initialValues={{
                        login: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        login: Yup.string()
                            .trim()
                            .max(10, 'Не больше 10 символов')
                            .min(4, 'От 4 символов')
                            .matches(/[a-z0-9]/g, "Требуется только буквы и числа")
                            .required('Требуется ввести логин'),
                        password: Yup.string()
                            .trim()
                            .max(7, 'Не больше 7 символов')
                            .min(4, 'От 4 символов')
                            .matches(/^[0-9]+$/g, "Требуется только числа")
                            .required('Требуется пароль'),
                    })}
                    onSubmit={(
                        values: { login: string, password: string },
                        { setSubmitting }: FormikHelpers<{ login: string, password: string }>
                    ) => {
                        setSubmitting(false);
                        ProjectsApi(Axios).login(values)
                            .then(res => {
                                if(res.token) router.push('/admin');
                            })
                    }}>
                    {() => (
                        <Form className={clsx('d-flex flex-column form', styles.login)}>
                            <MyTextInput label="Логин*" name="login" type="text" placeholder="Логин"/>
                            <MyTextInput label="Пароль" name="password" type="password" placeholder="**********"/>
                            <button type="submit">Войти</button>
                        </Form>
                    )}
                </Formik>
            </div>
    )
};