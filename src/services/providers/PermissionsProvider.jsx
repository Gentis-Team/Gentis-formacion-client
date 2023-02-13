import React, { createContext, useContext } from "react";
import { useStateContext } from '@/services/providers/StateContextProvider';



export const PermissionsContext = createContext({
    permisions: [],
    setPermissions: (permisions) => {}
})

export const PermissionsProvider = ({ children }) => {
    const stateContext = useStateContext();

    const user = stateContext.state.authUser;

    const [permissions, setPermissions] = React.useState();

    return (
        <PermissionsContext.Provider value={{ permissions, setPermissions }}>
            {children}
        </PermissionsContext.Provider>
    );
};

const usePermissions = () => {
    const context = useContext(PermissionsContext);

    if (context === undefined) {
        throw new Error("useExplorerState must be used within a ExplorerStateProvider");
    }
    return context;
};

export default usePermissions;