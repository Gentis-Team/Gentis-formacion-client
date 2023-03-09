import React from 'react';

const initialState = {
    filters: null,
};

const FiltersContext = React.createContext((undefined));


const filtersReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTERS': {
            return {
                ...state,
                filters: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const FiltersContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(filtersReducer, initialState);
    const value = { state, dispatch };
    return (
        <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
    );
};

const useFiltersContext = () => {
    const context = React.useContext(FiltersContext);

    if (context) {
        return context;
    }

    throw new Error(`useFiltersContext must be used within a FiltersContextProvider`);
};

export { FiltersContextProvider, useFiltersContext };
