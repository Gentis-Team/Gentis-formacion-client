import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material';


export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );


    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    ...(mode === 'light' && {
                        blue: {
                            500: '#00545F',
                            400: '#16727E',
                            300: '#1E99A9',
                            200: '#A4E6EF',
                            100: '#E9F9FB',
                        },
                        green: {
                            500: '#78891A',
                            400: '#9EB423',
                            300: '#BED730',
                            200: '#D9E887',
                            100: '#F4F8DD',
                        },
                        brown: {
                            500: '#321E1F',
                            400: '#734547',
                            300: '#734547',
                            200: '#D1B3B4',
                            100: '#F7F2F3',
                        },
                        basic: {
                            red: '#F65447',
                            green: '#F65447',
                        },
                    } ),
                    ...(mode === 'dark' && {
                        blue: {
                            500: '#00545F',
                            400: '#16727E',
                            300: '#1E99A9',
                            200: '#A4E6EF',
                            100: '#E9F9FB',
                        },
                        green: {
                            500: '#78891A',
                            400: '#9EB423',
                            300: '#BED730',
                            200: '#D9E887',
                            100: '#F4F8DD',
                        },
                        brown: {
                            500: '#321E1F',
                            400: '#734547',
                            300: '#734547',
                            200: '#D1B3B4',
                            100: '#F7F2F3',
                        },
                        basic: {
                            red: '#F65447',
                            green: '#F65447',
                        }                    }),
                    always: {
                        alwaysBlack: '#000000',
                        alwaysWhite: '#FFFFFF',
                    },
                    
                }
            }),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

const useColorMode = () => {
    const context = useContext(ColorModeContext);

    if (context === undefined) {
        throw new Error("useColorMode must be used within a ColorProvider");
    }
    return context;
};

export default useColorMode;