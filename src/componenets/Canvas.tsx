import * as React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Outlet } from "react-router-dom";
import "../scss/_btnStyles.scss"

interface ICanvasProps {
    navState: boolean;
    setNavBarState: Function;
    sideBarState: boolean;
    setSideBarState: Function;
}

const Canvas: React.FunctionComponent<ICanvasProps> = ({ navState, setNavBarState, setSideBarState, sideBarState }) => {
    const [canvasScale, setCanvasScale] = React.useState(2);
    const [canvasWidth, setCanvasWidth] = React.useState<number>(window.innerWidth);
    const canvasRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        window.addEventListener("resize", updateCanvasDimension);
        return () => {
            window.removeEventListener("resize", updateCanvasDimension);
        };
    }, []);

    React.useEffect(() => {
        updateCanvasDimension();
    }, []);

    const updateCanvasDimension = () => {
        if (canvasRef.current !== null) {
            const newWidth = canvasRef.current.clientWidth;
            setCanvasWidth(newWidth);
        }
    };

    const changeNavDisplayState = () => {
        setNavBarState(true);
    };

    const changeSideBarDisplayState = () => {
        setSideBarState((prevState: boolean) => !prevState);
    };

    const zoomFuncIn = () => {
        if (canvasScale < 2) {
            setCanvasScale((prevState: number) => prevState + 0.1);
        }
    };

    const zoomFuncOut = () => {
        if (canvasScale > 0.2) {
            setCanvasScale((prevState: number) => prevState - 0.1);
        }
    };

    return (
        <>
            <div className='canvasContainer'>
                {!navState && (
                    <span className="material-symbols-outlined menu" onClick={changeNavDisplayState}>
                        Menu
                    </span>
                )}
                <span className="material-symbols-outlined sideBarBtn" onClick={changeSideBarDisplayState}>
                    {!sideBarState ? "arrow_back" : "arrow_forward"}
                </span>
                <div className='canvas' ref={canvasRef}>
                    {canvasWidth && (
                        <Stage width={canvasWidth} height={400}>
                            <Layer>
                                <Rect
                                    x={(canvasWidth - (20 * canvasScale)) / 2}
                                    y={25}
                                    width={20}
                                    height={20}
                                    stroke="red"
                                    strokeWidth={1}
                                    scaleX={canvasScale}
                                    scaleY={canvasScale}
                                />
                            </Layer>
                        </Stage>
                    )}
                </div>

                <div className='zoomBtns' >
                    <button onClick={zoomFuncIn}>+</button>
                    <button onClick={zoomFuncOut}>-</button>
                </div>
                <div className="controls">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Canvas;



