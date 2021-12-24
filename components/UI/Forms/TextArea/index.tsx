import {useField} from "formik";
import {FC} from "react";

interface Interface {
    label: string;
    name: string;
    placeholder: string;
}

export const MyTextArea: FC<Interface> = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <textarea className="text-area" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </>
    );
};