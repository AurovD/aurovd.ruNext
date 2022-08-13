import Panel from "../../components/Panel";
import Head from "next/head";

export default function UpdatePage() {
    const obj = {
        title: "РЕДАКТИРОВАНИЕ"
    }
    return (
        <div className={"d-grid grid"}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Aurov Dmitry - Portfolio</title>
            </Head>
            <Panel {...obj}/>
        </div>
    )
}