import React from 'react';

/* MobX */
import { Provider } from 'mobx-react';
import { useStore } from '../stores';

/* I18N */
import { I18nextProvider } from 'react-i18next';
import i18n from '../locales/i18n';
import moment from 'moment';
import 'moment/locale/ko';
moment.locale('en');

/* Styles */
import 'nprogress/nprogress.css';
import 'codemirror/lib/codemirror.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import 'highlight.js/styles/atom-one-dark-reasonable.css';
import '../public/styles/editor.css';
import '../public/styles/init.css';

/* Components */
import Head from '../components/Head';

/* N-Progress */
import dynamic from 'next/dynamic';

/* Layout */
import DefaultLayout from '../layouts/DefaultLayout';
const TopProgressBar = dynamic(() => import('../components/TopProgressBar'), { ssr: false });

const App = ({ Component, pageProps }) => {
    const store = useStore(pageProps.initializeData);

    return (
        <Provider {...store}>
            <I18nextProvider i18n={i18n}>
                <Head />
                <DefaultLayout>
                    <Component {...pageProps} />
                </DefaultLayout >
            </I18nextProvider>
            <TopProgressBar />
        </Provider>
    )
}

export default App;