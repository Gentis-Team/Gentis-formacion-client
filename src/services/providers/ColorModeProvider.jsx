import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material';


export const ColorModeContext = createContext( {
    toggleColorMode: () => { }
} );

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState("light");
    const colorMode = useMemo(
        () => ( {
            toggleColorMode: () => {
                setMode( ( prevMode ) => ( prevMode === 'light' ? 'dark' : 'light' ) );
            },
        } ),
        [],
    );


    const theme = useMemo(
        () =>
            createTheme( {
                palette: {
                    mode,
                    ...( mode === 'light' && {
                            primary: {
                                main: '#00545f',
                            },
                            secondary: {
                                main: '#bed730',
                            },
                            info: {
                                main: '#9eb424',
                            },
                            background: {
                                default: '#fafafa',
                            },
                        
                    } ),
                },
            } ),
        [ mode ],

    );

    return (
        <ColorModeContext.Provider value={ colorMode }>
            <ThemeProvider theme={ theme }>
                { children }
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

const useColorMode = () => {
    const context = useContext( ColorModeContext );

    if ( context === undefined ) {
        throw new Error( "useColorMode must be used within a ColorProvider" );
    }
    return context;
};

export default useColorMode;



