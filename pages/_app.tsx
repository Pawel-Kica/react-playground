import type { AppProps } from 'next/app';
import ThemeContextComponent from '../components/globals/ThemeContextComponent';
import '../styles/globals.css';

function App({ Component, pageProps }: AppProps) {
    return (
        <main className="w-max-screen relative min-h-[calc(100vh)] w-screen">
            <ThemeContextComponent>
                <Component {...pageProps} />
            </ThemeContextComponent>
        </main>
    );
}
export default App;
