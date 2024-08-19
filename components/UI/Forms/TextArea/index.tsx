import {useField} from "formik";
import {FC} from "react";
import styles from './TextArea.module.scss';
import clsx from "clsx";

interface Interface {
    label: string;
    name: string;
    placeholder: string;
}

export const MyTextArea: FC<Interface> = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <div className={clsx('relative', styles.form_textarea)}>
            <label htmlFor={props.name} className={clsx("absolute label")}>{label}</label>
            <textarea{...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={clsx("absolute error")}>{meta.error}</div>
            ) : null}
        </div>
    );
};