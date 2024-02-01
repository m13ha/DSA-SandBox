import React, { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { Graph } from '../util/createGraphNodes';

interface GraphContextType {
  graph: Graph;
  setGraphValue: Dispatch<SetStateAction<Graph>>;
}

interface GraphContextProviderProps {
  children: ReactNode;
}

const defaultValue: GraphContextType = {
  graph: new Graph(),
  setGraphValue: () =>{},
};

const GraphContext = createContext<GraphContextType>(defaultValue);

const GraphContextProvider: React.FC<GraphContextProviderProps> = ({ children }) => {
  const [graph, setGraphValue] = useState<Graph>(defaultValue.graph);

  useEffect(() => {
    console.log(graph)
  }, [graph])

  return (
    <GraphContext.Provider value={{ graph, setGraphValue }}>
      {children}
    </GraphContext.Provider>
  );
};

export { GraphContext, GraphContextProvider };
