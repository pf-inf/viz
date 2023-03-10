import React, { createContext, useReducer } from 'react';
import { ConnectionConfigReducer } from 'core/store/ConnectionConfigContext/ConnectionConfigReducer';

export const ConnectionConfigContext = createContext();

const ConnectionConfigContextProvider = (props) => {
    const [ connectionConfig, dispatch ] = useReducer( ConnectionConfigReducer,
        {
            connected: false, 
            url: 'http://localhost:7474/db/data/transaction/commit',
            user: 'neo4j',
            pass: '12345',
            info: ''
        }
    )
    return (  
        <ConnectionConfigContext.Provider value={{ connectionConfig, dispatch }}>
            {props.children}
        </ConnectionConfigContext.Provider>
    );
}
 
export default ConnectionConfigContextProvider;