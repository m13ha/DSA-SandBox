import React, { ReactNode } from 'react';
import { StackContextProvider } from '../contexts/StackContext';
import { QueueContextProvider } from './QueueContext';
import { CanvasWidthContextProvider } from "../contexts/CanvaWidth"
import { TreeBSTContextProvider } from './TreeContext';

interface ProvidersProps {
    children: ReactNode;
}


const Providers: React.FC<ProvidersProps> = ({ children }) => {

    return (
        <CanvasWidthContextProvider>
            <TreeBSTContextProvider>
                <QueueContextProvider>
                    <StackContextProvider>
                        {children}
                    </StackContextProvider>
                </QueueContextProvider>
            </TreeBSTContextProvider >
        </CanvasWidthContextProvider>

    );
};

export default Providers