import React, {useEffect, useState} from 'react';
import clsx from "clsx";
import styles from './ErrorPage.module.scss';
import Link from "next/link";

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomColor = () => {
    const red = generateRandomNumber(0, 255);
    const green = generateRandomNumber(0, 255);
    const blue = generateRandomNumber(0, 255);
    return `rgb(${red}, ${green}, ${blue})`;
};

export const ErrorPage: React.FC = () => {
    const arrayLength = 20;
    const emptyArray = Array.from({ length: arrayLength });
    const [boxes, setBoxes] = useState([]);

    useEffect(() => {
        const generatedBoxes = emptyArray.map(() => ({
            gridRow: `${generateRandomNumber(1, 10)}}`,
            gridColumn: `${generateRandomNumber(1, 10)}`,
            backgroundColor: generateRandomColor(),
        }));
        setBoxes(generatedBoxes);
    }, []);

    return (
        <div className={clsx("wrapper relative", styles.error_page)}>
            <div className={clsx("wrapper relative", styles.error_page_wrapper)}>
                <div className={clsx(styles.error_headers)}>
                    <h2>ERROR<br />PAGE</h2>
                    <Link href="/">BRING<br />ME BACK<br />TO MAIN PAGE</Link>
                </div>
                <div className={clsx(styles.boxes)}>
                    {boxes.map((box, index) => (
                        <div
                            key={index}
                            className={clsx(styles.box)}
                            style={{
                                gridRow: box.gridRow,
                                gridColumn: box.gridColumn,
                                backgroundColor: box.backgroundColor,
                            }}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
