import React from 'react';
import {Panel} from "../components/Panel";
import {CreateProject} from "../components/CreateProject";

export default function Adding() {
    return (
        <div className={"d-grid grid"}>
            <Panel id={3} title='СОЗДАТЬ НОВЫЙ ПРОЕКТ'/>
            <CreateProject/>
        </div>
    )
};