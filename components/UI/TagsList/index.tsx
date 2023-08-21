import styles from './TagsList.module.scss';
import clsx from "clsx";
import {TagCard} from "../TagCard";
import React from "react";


export const TagsList = ({tags}) => {
    console.log(tags);
    return (
            <div className={clsx("sticky", styles.tags, styles.about_block)}>
                {tags.length > 0 && <h3>Технологии</h3>}
                <div className={clsx("d-flex", styles.tags_list)}>
                    {tags.map((tag, index) =>
                        'count_of_tags' in tag ? (
                            <TagCard key={tag.Tag.title} count_of_tags={tag.count_of_tags} Tag={tag.Tag} />
                        ) : (
                            <TagCard key={tag.title} Tag={tag} />
                        )
                    )}
                </div>
            </div>
    )
}