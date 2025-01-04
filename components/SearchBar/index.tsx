import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import clsx from "clsx";
import styles from './SearchBar.module.scss';
import * as Yup from "yup";
import {useSearchBar} from "./searchBar";


export const SearchBar: React.FC = () => {

    const [searching, message] = useSearchBar(state => [
        state.searching,
        state.message
    ]);


    return (
        <div>
            <Formik
                initialValues={{
                request: ""
            }}
                validationSchema={Yup.object({
                    request: Yup.string()
                })}
                onSubmit={(
                    values: { request: string },
                ) => {
                    searching(values.request.trim());
                    values.request = "";
                }}
            >
                {(formProps) => (
                    <>
                        <Form className={clsx('d-flex', styles.search_form)}>
                            <Field type="text" name="request" placeholder={message}/>
                            <button type={"submit"}>Поиск</button>
                            {/*{message && <p className={clsx(styles.msg)}>{message}</p>}*/}
                        </Form>
                    </>
                )}
            </Formik>
        </div>
    );
};