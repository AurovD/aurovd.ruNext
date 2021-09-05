import React from 'react';
import styles from './Login.module.scss';
import clsx from "clsx";
import {NextPage} from "next";
import Link from 'next/link';

export const Login: NextPage = () => {
    return (
        <div className={clsx("column d-flex", styles.login_wrapper)}>
            <form action="">

            </form>
            <div className={clsx(styles.auth_links)}>
                <Link href={'/registration'}>
                    <a className={clsx("")}>Регистрация</a>
                </Link>
            </div>
        </div>
    )
};

// export const getServerSideProps = async () => {
//     try {
//         console.log("kjhkhh")
//         return {props: {}}
//     } catch (err) {
//         console.log("err")
//     }
// };