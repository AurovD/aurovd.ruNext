import React from "react";
import {Panel} from "../components/Panel";
import {Introduction} from "../components/Introduction";
import Head from "next/head";


type MainContextProps = {
    page: number;
};

export const MainContext = React.createContext<MainContextProps>({} as MainContextProps);

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
                    <title>Aurov Dmitry - Portfolio</title>
                </Head>
                <Panel {...obj}/>
                <Introduction/>
            </div>
  )
}
