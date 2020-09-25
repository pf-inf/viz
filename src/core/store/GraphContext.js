import React, { createContext, useContext, useReducer } from 'react';
import { useQuery } from 'react-query';
import { ConnectionConfigContext } from './ConnectionConfigContext';
import { GraphReducer } from './GraphReducer';
import { fetchGraph } from "core/services/graphBuildingService";
import { VisualConfigContext } from './VisualConfigContext';

export const GraphContext = createContext();

const GraphContextProvider = (props) => {
    const { connectionConfig } = useContext(ConnectionConfigContext);
    const { visualConfig } = useContext(VisualConfigContext);
    const [ graph, dispatch ] = useReducer(GraphReducer,
        {
            nodes: [
                { id: 1, label: "Node 1", title: "node 1 tootip text" },
                { id: 2, label: "Node 2", title: "node 2 tootip text" },
                { id: 3, label: "Node 3", title: "node 3 tootip text" },
                { id: 4, label: "Node 4", title: "node 4 tootip text" },
                { id: 5, label: "Node 5", title: "node 5 tootip text" }
            ],
            edges: [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 2, to: 4 },
                { from: 2, to: 5 }
            ]
        })
    const query = "select n, f, m match (n) - [f:Friend] -> (m)";
    const updateGraph = (data) => {
        dispatch({type:"UPDATE_GRAPH", graph:data});
    }
    const { data, status } = useQuery(["graph", connectionConfig, visualConfig, query], fetchGraph, {
        onSuccess: updateGraph
    });
    return (  
        <GraphContext.Provider value={{ graph, dispatch }}>
            {props.children}
        </GraphContext.Provider>
    );
}
 
export default GraphContextProvider;