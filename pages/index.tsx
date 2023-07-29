import React from "react";
import Panel from "../components/Panel";
import {Introduction} from "../components/Introduction";
import Head from "next/head";


// type MainContextProps = {
//     page: number;
// };
//
// export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

export default function Home() {
    const obj = {
        id: 0,
        title: "АЮРОВ ДМИТРИЙ",
        h2: "ВЕБ-РАЗРАБОТЧИК"
    }
  return (
            <div className={"d-grid grid"}>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Аюров Дмитрий | Веб разработка | Портфолио</title>
                    <meta name="author" content="Аюров Дмитрий"/>
                    <meta name="robots" content="index, follow"/>
                    <link rel="canonical" href="https://www.aurovdm.ru"/>
                    <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon"/>
                    <meta property="og:title" content="Аюров Дмитрий | Веб разработка | Портфолио"/>
                    <meta property="og:description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                    <meta property="og:url" content="https://www.aurovdm.ru"/>
                    <meta name="description" content="Аюров Дмитрий - опытный веб-разработчик с портфолио проектов. Посмотрите мои работы и навыки в веб разработке."/>
                    <meta name="keywords" content="Аюров Дмитрий, веб разработка, портфолио, web development, web developer, проекты, работы, backend, frontend, резюме"/>
                </Head>
                <Panel {...obj}/>
                <Introduction/>
            </div>
  )
}
