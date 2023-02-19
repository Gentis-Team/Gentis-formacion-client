import React from 'react';

const initialState = {
    courses: null,
};

const CoursesContext = React.createContext((undefined));


const coursesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COURSES': {
            return {
                ...state,
                courses: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const CoursesContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(coursesReducer, initialState);
    const value = { state, dispatch };
    return (
        <CoursesContext.Provider value={value}>{children}</CoursesContext.Provider>
    );
};

const useCoursesContext = () => {
    const context = React.useContext(CoursesContext);

    if (context) {
        return context;
    }

    throw new Error(`useCoursesContext must be used within a CoursesContextProvider`);
};

export { CoursesContextProvider, useCoursesContext };
