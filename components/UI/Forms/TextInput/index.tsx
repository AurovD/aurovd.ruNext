import {useField} from "formik";
import {FC} from "react";
import styles from './TextInput.module.scss';
import clsx from "clsx";

interface Interface {
    label: string;
    name: string;
    type: string;
    placeholder: string;
}

export const MyTextInput: FC<Interface> = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div className={clsx('d-flex flex-column relative', styles.form_input)}>
            <label htmlFor={props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className={clsx("absolute error")}>{meta.error}</div>
            ) : null}
        </div>
    );
};