import React from 'react';

const initialState = {
    groups: null,
};

const GroupsContext = React.createContext((undefined));


const groupsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GROUPS': {
            return {
                ...state,
                groups: action.payload,
            };
        }
        default: {
            throw new Error(`Unhandled action type`);
        }
    }
};

const GroupsContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(groupsReducer, initialState);
    const value = { state, dispatch };
    return (
        <GroupsContext.Provider value={value}>{children}</GroupsContext.Provider>
    );
};

const useGroupsContext = () => {
    const context = React.useContext(GroupsContext);

    if (context) {
        return context;
    }

    throw new Error(`useGroupsContext must be used within a GroupsContextProvider`);
};

export { GroupsContextProvider, useGroupsContext };
