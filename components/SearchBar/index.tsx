import React, {useEffect, useState} from 'react';
import {ErrorMessage, Field, Form, Formik, FormikHelpers} from "formik";
import clsx from "clsx";
import styles from './SearchBar.module.scss';
import * as Yup from "yup";
import {useSearchBar} from "./searchBar";


export const SearchBar: React.FC = () => {

    const [searching] = useSearchBar(state => [
        state.searching,
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
                    // console.log(values);
                    searching(values.request);
                }}
            >
                {(formProps) => (
                    <Form className={clsx('d-flex', styles.search_form)}>
                        <Field type="text" name="request"/>
                        <button type={"submit"}>Поиск</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};