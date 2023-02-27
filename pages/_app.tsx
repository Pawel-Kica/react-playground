import type { AppProps } from 'next/app';
import ThemeContextComponent from '../components/globals/ThemeContextComponent';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeContextComponent>
            <main className="w-max-screen min-h-[calc(100vh)]">
                <Component {...pageProps} />
            </main>
        </ThemeContextComponent>
    );
}
export default App;
