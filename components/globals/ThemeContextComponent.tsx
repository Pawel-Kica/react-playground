import { createContext, useContext, useEffect, useState } from 'react';

export const useTheme = () => useContext(ThemeContext);
export const ThemeContext = createContext({ theme: '', setTheme: (value: themeOption) => {} });

export type themeOption = 'dark' | 'light' | '';

export default function ThemeContextComponent({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<themeOption>('');

    useEffect(() => {
        if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
