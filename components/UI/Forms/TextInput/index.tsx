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
    const [field, meta, helpers] = useField(props);
    return (
        <div className={clsx('relative', styles.form_input)}>
            <label htmlFor={props.name} className={clsx("absolute label")}>{label}</label>
            <input {...field}{...props}
                onChange={event => {
                    if (label === 'Тэги') {
                        let str = event.target.value.split(" ").map(tag => !~tag.indexOf("#") && tag.length >= 1 ? `#${tag}` : `${tag}`).join(' ');
                        helpers.setValue(str);
                    }
                    else {
                        helpers.setValue(event.target.value);
                    }
                }}
            />
            {meta.touched && meta.error ? (
                <div className={clsx("absolute error")}>{meta.error}</div>
            ) : null}
        </div>
    );
};