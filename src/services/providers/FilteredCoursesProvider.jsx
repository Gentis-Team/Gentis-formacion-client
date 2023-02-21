import React from 'react';

const initialState = {
    filteredCourses: null,
};

const FilteredCoursesContext = React.createContext((undefined));


const filteredCoursesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_FILTERED_COURSES': {
            return {
                ...state,
                filteredCourses: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const FilteredCoursesContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(filteredCoursesReducer, initialState);
    const value = { state, dispatch };
    return (
        <FilteredCoursesContext.Provider value={value}>{children}</FilteredCoursesContext.Provider>
    );
};

const useFilteredCoursesContext = () => {
    const context = React.useContext(FilteredCoursesContext);

    if (context) {
        return context;
    }

    throw new Error(`useFilteredCoursesContext must be used within a FilteredCoursesContextProvider`);
};

export { FilteredCoursesContextProvider, useFilteredCoursesContext };
