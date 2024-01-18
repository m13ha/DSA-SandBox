import * as React from 'react';


interface CanvasWidthContextProviderProps {
    children: React.ReactNode;
}

interface defaultValue  {
    canvasWidth: number;
    setCanvasWidth: Function;
};

const Value =  {
    canvasWidth: 0,
    setCanvasWidth: () => {
    }
};

const CanvasWidthContext = React.createContext<defaultValue>(Value);

const CanvasWidthContextProvider: React.FC<CanvasWidthContextProviderProps>  = ({ children }) => {
    const [canvasWidth, setCanvasWidth] = React.useState<number>(window.innerWidth);
    return (
        <CanvasWidthContext.Provider value={{ canvasWidth, setCanvasWidth }}>
            {children}
        </CanvasWidthContext.Provider>
    );
};

export { CanvasWidthContext, CanvasWidthContextProvider };