import React from 'react';

const initialState = {
    categories: null,
};

const CategoriesContext = React.createContext((undefined));


const categoriesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORIES': {
            return {
                ...state,
                categories: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const CategoriesContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(categoriesReducer, initialState);
    const value = { state, dispatch };
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    );
};

const useCategoriesContext = () => {
    const context = React.useContext(CategoriesContext);

    if (context) {
        return context;
    }

    throw new Error(`useCategoriesContext must be used within a CategoriesContextProvider`);
};

export { CategoriesContextProvider, useCategoriesContext };
