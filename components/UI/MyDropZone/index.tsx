import React from 'react';
import styles from './MyDropZone.module.scss';
import clsx from "clsx";
import Dropzone from 'react-dropzone';

type Props = {
    acceptedFiles: any[],
    setAcceptedFiles: React.Dispatch<React.SetStateAction<any[]>>,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
};

export const MyDropzone: React.FC<Props> = ({ acceptedFiles, setAcceptedFiles, setFieldValue}) => (
    <Dropzone onDrop={(files) => {
        setAcceptedFiles(files);
        setFieldValue("previews", files);
    }} multiple={true}>
        {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className={clsx(styles.dropzone)}>
                <input {...getInputProps()} />
                {acceptedFiles.length > 0 ? (
                    <div>
                        {acceptedFiles.map((file) => (
                            <div key={file.name}>
                                <img className={clsx(styles.img)}
                                     src={URL.createObjectURL(file)}
                                     alt={file.name}
                                />
                            </div>
                        ))}
                    </div>
                ) : <p>Перетащи изображение или щелкни чтобы выбрать</p>}
            </div>
        )}
    </Dropzone>
);
