import React from 'react';
import styles from './Form.module.scss';

interface Values {
    title: string;
    lastName: string;
    description: string;
    link?: string;
    github?: string;
    files: FileList;
}




export const Form = () => {
    return (
        <div className={'d-flex justify-content-center align-items-center'}>
            <form method='post'>
                <input type="text"/>
            </form>
        </div>
    )
};