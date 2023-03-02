import React, { useState, createContext, useContext, useMemo } from "react";
import { ThemeProvider, createTheme } from '@mui/material';


export const ColorModeContext = createContext( {
    toggleColorMode: () => { }
} );

export const ColorModeProvider = ( { children } ) => {
    const [ mode, setMode ] = useState( "dark" );
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
                        palette: {
                            type: 'light',
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
                        },
                    } ),
                    // ...( mode === 'dark' && {
                    // } ),
                },
                typography: {
                    fontFamily: 'Open Sans',
                    fontSize: 14,
                    fontWeightBold: 900,
                    fontWeightMedium: 600,
                    fontWeightLight: 500,
                    h1: {
                        fontSize: 80,
                        fontFamily: 'Kanit',
                        fontWeight: 800,
                        lineHeight: '5.5rem',
                        
                    },
                    h2: {
                        fontFamily: 'Kanit',
                        fontWeight: 800,
                        fontSize: '4.5rem',
                        lineHeight: 1.1,
                    },
                    h3: {
                        fontSize: '3.5rem',
                        lineHeight: 1.1,
                        fontWeight: 1000,
                    },
                    h4: {
                        fontSize: '2.5rem',
                        fontWeight: 1000,
                    },
                    h5: {
                        fontSize: '0.9rem',
                        lineHeight: 1.2,
                        fontWeight: 800,
                    },
                    h6: {
                        fontSize: '1.5rem',
                        fontWeight: 1000,
                    },
                    subtitle1: {
                        fontWeight: 700,
                    },

                },
                shape: {
                    borderRadius: '1rem',
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



