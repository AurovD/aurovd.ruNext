import React from 'react';
import {Panel} from "../components/Panel";
import {CreateProject} from "../components/Create";

export default function Create() {
    return (
        <div className={"d-grid grid"}>
            <Panel id={3} title='СОЗДАТЬ НОВЫЙ ПРОЕКТ'/>
            <CreateProject/>
        </div>
    )
};