import Document, { Html, Head, Main, NextScript } from 'next/document'

class AppDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>Aurov Dmitry - Portfolio</title>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
    )
    }
}

export default AppDocument;