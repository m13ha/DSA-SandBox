import React, { createContext, ReactNode, useState, Dispatch, SetStateAction, useEffect } from 'react';
import { TreeBST } from '../util/createTreeNode';

interface TreeBSTContextType {
  treeBST: TreeBST;
  setTreeBSTValue: Dispatch<SetStateAction<TreeBST>>;
}

interface TreeBSTContextProviderProps {
  children: ReactNode;
}

const defaultValue: TreeBSTContextType = {
  treeBST: new TreeBST(),
  setTreeBSTValue: () =>{},
};

const TreeBSTContext = createContext<TreeBSTContextType>(defaultValue);

const TreeBSTContextProvider: React.FC<TreeBSTContextProviderProps> = ({ children }) => {
  const [treeBST, setTreeBSTValue] = useState<TreeBST>(defaultValue.treeBST);

  return (
    <TreeBSTContext.Provider value={{ treeBST, setTreeBSTValue }}>
      {children}
    </TreeBSTContext.Provider>
  );
};

export { TreeBSTContext, TreeBSTContextProvider };
