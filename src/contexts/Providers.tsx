import React, { ReactNode } from 'react';
import { StackContextProvider } from '../contexts/StackContext';
import { QueueContextProvider } from './QueueContext';
import { CanvasWidthContextProvider } from "../contexts/CanvaWidth"

interface ProvidersProps {
    children: ReactNode;
}


const Providers: React.FC<ProvidersProps> = ({ children }) => {

    return (
        <CanvasWidthContextProvider>
            <QueueContextProvider>
                <StackContextProvider>
                    {children}
                </StackContextProvider>
            </QueueContextProvider>
        </CanvasWidthContextProvider>

    );
};

export default Providers