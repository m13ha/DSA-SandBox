import React, { createContext, ReactNode, useState, Dispatch, SetStateAction } from 'react';
import { Queue } from '../util/createQueueNode';

interface QueueContextType {
  queue: Queue;
  setQueueValue: Dispatch<SetStateAction<Queue>>;
}

interface QueueContextProviderProps {
  children: ReactNode;
}

const defaultValue: QueueContextType = {
  queue: new Queue([], 0),
  setQueueValue: () =>{},
};

const QueueContext = createContext<QueueContextType>(defaultValue);

const QueueContextProvider: React.FC<QueueContextProviderProps> = ({ children }) => {
  const [queue, setQueueValue] = useState<Queue>(defaultValue.queue);

  return (
    <QueueContext.Provider value={{ queue, setQueueValue }}>
      {children}
    </QueueContext.Provider>
  );
};

export { QueueContext, QueueContextProvider };
