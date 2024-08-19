import Document, { Html, Main, Head, NextScript } from 'next/document'
import React from "react";

class AppDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="ru">
                <Head>
                </Head>
                <body>
                    <Main />
                    <NextScript/>
                </body>
            </Html>
    )
    }
}

export default AppDocument;