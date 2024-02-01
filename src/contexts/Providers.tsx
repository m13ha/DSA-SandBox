import React, { ReactNode } from 'react';
import { StackContextProvider } from '../contexts/StackContext';
import { QueueContextProvider } from './QueueContext';
import { CanvasWidthContextProvider } from "../contexts/CanvaWidth"
import { TreeBSTContextProvider } from './TreeContext';
import { GraphContextProvider } from './GraphContext';

interface ProvidersProps {
    children: ReactNode;
}


const Providers: React.FC<ProvidersProps> = ({ children }) => {

    return (
        <CanvasWidthContextProvider>
            <GraphContextProvider>
                <TreeBSTContextProvider>
                    <QueueContextProvider>
                        <StackContextProvider>
                            {children}
                        </StackContextProvider>
                    </QueueContextProvider>
                </TreeBSTContextProvider >
            </GraphContextProvider >
        </CanvasWidthContextProvider>



    );
};

export default Providers