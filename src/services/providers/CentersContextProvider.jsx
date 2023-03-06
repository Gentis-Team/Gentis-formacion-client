import React from 'react';

const initialState = {
    centers: null,
};

const CentersContext = React.createContext((undefined));


const centersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CENTERS': {
            return {
                ...state,
                centers: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const CentersContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(centersReducer, initialState);
    const value = { state, dispatch };
    return (
        <CentersContext.Provider value={value}>{children}</CentersContext.Provider>
    );
};

const useCentersContext = () => {
    const context = React.useContext(CentersContext);

    if (context) {
        return context;
    }

    throw new Error(`useCentersContext must be used within a CentersContextProvider`);
};

export { CentersContextProvider, useCentersContext };
