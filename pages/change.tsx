import React, {useState} from 'react';
import Head from "next/head";
import Panel from "../components/Panel";
import * as Yup from "yup";
import {Form, Formik, FormikHelpers} from "formik";
import {Axios} from "../axios/axios";
import clsx from "clsx";
import styles from "../components/Create/Create.module.scss";
import {MyTextInput} from "../components/UI/Forms/TextInput";
import {Toast} from "../components/UI/Toast";
import {Password} from "../types/types";
import {ProjectsApi} from "../api/ProjectsApi";

export default function Change() {
    const [msg, setMsg] = useState({
        msg: 'Пароль изменен',
        status: null
    });

    const removeValues = () => {
        setTimeout(() => {
            setMsg({
                msg: '',
                status: null
            })
        }, 5000);
    }

    const startToast = (msg) => {
        setMsg(msg);
        removeValues();
    }
    return (
        <div className="d-grid grid">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>СМЕНИТЬ ПАРОЛЬ</title>
            </Head>
            <Panel title='СМЕНИТЬ ПАРОЛЬ'/>
            <div className={'d-flex justify-content-start'}>
                <Formik
                    initialValues={{
                        password: '123',
                        new_password: '',
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string()
                            .trim()
                            .max(7, 'Не больше 7 символов')
                            .min(4, 'От 4 символов')
                            .matches(/^[0-9]+$/g, "Требуется только числа")
                            .required('Требуется идентификация по паролю'),
                        new_password: Yup.string()
                            .trim()
                            .max(7, 'Не больше 7 символов')
                            .min(4, 'От 4 символов')
                            .matches(/^[0-9]+$/g, "Требуется только числа")
                            .required('Требуется новый пароль'),
                    })}
                    onSubmit={(
                        values: Password,
                        { setSubmitting }: FormikHelpers<Password>
                    ) => {
                        setSubmitting(false);
                        if(values.password === values.new_password){
                            startToast({msg: "Одинаковый пароль", status: 400})
                            removeValues();
                        } else {
                            ProjectsApi(Axios).change(values)
                                .then(res => startToast({msg: res.msg || "Ошибка", status: 200}))
                                .catch((res) => {
                                    startToast({msg: res.response?.data?.msg || "Ошибка", status: res.response?.status})
                                    removeValues();
                                })

                        }
                    }}>
                    {() => (
                        <Form className={clsx('d-flex flex-column', styles.form)}>
                            <MyTextInput label="Пароль*" name="password" type="password" placeholder="**********"/>
                            <MyTextInput label="Изменить пароль" name="new_password" type="password" placeholder="**********"/>
                            <button type="submit">Сменить пароль</button>
                            {msg.status && <Toast msg={msg.msg} status={msg.status}/>}
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
};