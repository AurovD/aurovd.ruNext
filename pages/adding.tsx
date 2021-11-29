import React from 'react';
import {Panel} from "../components/Panel";
import {Form} from "../components/Form";

export default function Adding() {
    return (
        <div className={"d-grid grid"}>
            <Panel id={3} title='СОЗДАТЬ НОВЫЙ ПРОЕКТ'/>
            <Form/>
        </div>
    )
};