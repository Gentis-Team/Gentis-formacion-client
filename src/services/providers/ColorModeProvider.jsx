import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';


export const ColorModeContext = createContext({
    toggleColorMode: () => { }
});

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState("dark");
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
                        primary: {
                            main: '#806EDF',
                        },
                        background: {
                            default: '#F7F7FD',
                            paper: '#fefcfe',
                        },
                        text: {
                            secondary: '#1D182F',
                        },
                        divider: '#1D182F',
                    }),
                    ...(mode === 'dark' && {
                        primary: {
                            main: '#998BE5',
                        },
                        background: {
                            default: '#1D182F',
                            paper: '#231F35',
                            filter: 'green'
                        },
                        text: {
                            secondary: '#F7F7FD',
                        },
                        divider: '#F7F7FD',
                    }),
                    secondary: {
                        main: '#f50057',
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