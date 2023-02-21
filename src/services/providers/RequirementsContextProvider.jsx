import React from 'react';

const initialState = {
    requirements: null,
};

const RequirementsContext = React.createContext((undefined));


const requirementsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_REQUIREMENTS': {
            return {
                ...state,
                requirements: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const RequirementsContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(requirementsReducer, initialState);
    const value = { state, dispatch };
    return (
        <RequirementsContext.Provider value={value}>{children}</RequirementsContext.Provider>
    );
};

const useRequirementsContext = () => {
    const context = React.useContext(RequirementsContext);

    if (context) {
        return context;
    }

    throw new Error(`useRequirementsContext must be used within a RequirementsContextProvider`);
};

export { RequirementsContextProvider, useRequirementsContext };
