import Document, {Head, Html, Main, NextScript} from 'next/document'

export default class MyDocument extends Document{
    render(){
        return(
            <Html>
                <Head>
                    <link rel="shortcut icon" href="images/favicon.png"/>
                </Head>
                <body>
                    <div id="modal-root"></div>
                    <Main />
                    <NextScript />
                    
                </body>
            </Html>
        )
    }
}