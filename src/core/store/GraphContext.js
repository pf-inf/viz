import React, { createContext, useContext, useReducer, useState } from 'react';
import { useQuery } from 'react-query';
import { ConnectionConfigContext } from './ConnectionConfigContext';
import { GraphReducer } from './GraphReducer';
import { fetchGraph } from "core/services/graphBuildingService";
import { VisualConfigContext } from './VisualConfigContext';
import { FiltersContext } from './FiltersContext';

export const GraphContext = createContext();

const GraphContextProvider = (props) => {
    const [ query, setQuery ] = useState("select n, f, m match (n) - [f:Friend] -> (m)");
    const { connectionConfig } = useContext(ConnectionConfigContext);
    const { visualConfig } = useContext(VisualConfigContext);
    const { filters } = useContext(FiltersContext);
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
            ],
            info: {
                success: true,
                description: '' 
            } 
        });
    const updateGraph = (data) => {
        if(data == null) return;
        if(data.info.success){
            dispatch({type:"UPDATE_GRAPH", graph:data});
        } else {
            dispatch({type:"ERROR", error: data.info.description});
        }
    }

    const { data, status } = useQuery(["graph", connectionConfig, visualConfig, query, filters], fetchGraph, {
        onSuccess: updateGraph,
    });
    
    return (  
        <GraphContext.Provider value={{ graph, dispatch, query, setQuery}}>
            {props.children}
        </GraphContext.Provider>
    );
}
 
export default GraphContextProvider;