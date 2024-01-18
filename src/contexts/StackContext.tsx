import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { Stack } from '../util/createStackNode';

interface StackContextType {
  stack: Stack;
  setStackValue: Dispatch<SetStateAction<Stack>>;
}

interface StackContextProviderProps {
  children: ReactNode;
}

const defaultValue: StackContextType = {
  stack: new Stack(),
  setStackValue: () =>{},
};

const StackContext = createContext<StackContextType>(defaultValue);

const StackContextProvider: React.FC<StackContextProviderProps> = ({ children }) => {
  const [stack, setStackValue] = useState<Stack>(defaultValue.stack);


  return (
    <StackContext.Provider value={{ stack, setStackValue }}>
      {children}
    </StackContext.Provider>
  );
};

export { StackContext, StackContextProvider };
