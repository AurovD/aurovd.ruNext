import React from "react";
import {useSearchBar} from "../../SearchBar/searchBar";
import styles from './FiltersOrderPanel.module.scss';
import clsx from "clsx";

export const FiltersOrderPanel: React.FC = () => {
    const [filters] = useSearchBar(state => [
        state.filters,
    ]);
    return (
        <div className={clsx("d-flex d-i-flex", styles.filtersOrderPanel)}>
            {filters.map((filter) => <div key={filter}>{filter}</div>)}
        </div>
    )
}