import React from 'react';

const initialState = {
    locations: null,
};

const LocationsContext = React.createContext((undefined));


const locationsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOCATIONS': {
            return {
                ...state,
                locations: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const LocationsContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(locationsReducer, initialState);
    const value = { state, dispatch };
    return (
        <LocationsContext.Provider value={value}>{children}</LocationsContext.Provider>
    );
};

const useLocationsContext = () => {
    const context = React.useContext(LocationsContext);

    if (context) {
        return context;
    }

    throw new Error(`useLocationsContext must be used within a LocationsContextProvider`);
};

export { LocationsContextProvider, useLocationsContext };
