import { SWRConfig } from 'swr';
import { swrOptions } from '../utils/api';
import '../public/tailwind.css';

function MyApp({ Component, pageProps }) {
    return (
        <SWRConfig value={swrOptions}>
            <Component {...pageProps} />
        </SWRConfig>
    );
}

export default MyApp;
