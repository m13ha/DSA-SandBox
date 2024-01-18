import * as React from 'react';
import { Stage, Layer, Rect, Text, KonvaNodeEvents } from 'react-konva';
import { Outlet } from "react-router-dom";
import { StackContext } from '../contexts/StackContext';
import "../scss/_btnStyles.scss"
import { CanvasWidthContext } from '../contexts/CanvaWidth';

interface ICanvasProps {
    navState: boolean;
    setNavBarState: Function;
    sideBarState: boolean;
    setSideBarState: Function;
}

const Canvas: React.FunctionComponent<ICanvasProps> = ({ navState, setNavBarState, setSideBarState, sideBarState }) => {
    const { canvasWidth, setCanvasWidth } = React.useContext(CanvasWidthContext)
    const canvasRef = React.useRef<HTMLDivElement>(null);
    const { stack, setStackValue } = React.useContext(StackContext)
    const stageRef = React.useRef<any>(null);
    const layerRef = React.useRef<any>(null);

    const [scale, setScale] = React.useState(1);


    // React.useEffect(() => {
    //     console.log(stack)
    // }, [stack, setStackValue])

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
        if (scale < 3) {
            setScale((prevState: number) => prevState * 1.1);
        }
    };

    const zoomFuncOut = () => {
        if (scale > 0.2) {
            setScale((prevState: number) => prevState / 1.1);
        }
    };


    const handleWheel = (e: any) => {
        e.evt.preventDefault();

        // adjust the scale based on the wheel movement
        const newScale = e.evt.deltaY > 0 ? scale * 1.1 : scale / 1.1;

        // limit the scale to avoid extreme zoom levels
        const limitedScale = Math.min(Math.max(newScale, 0.2), 3);

        setScale(limitedScale);
    };

    // Attach wheel event listener on mount
    React.useEffect(() => {
        const stage = stageRef.current;

        if (stage) {
            stage.on('wheel', handleWheel);
        }

        return () => {
            if (stage) {
                stage.off('wheel', handleWheel);
            }
        };
    }, [handleWheel]);

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
                        <Stage width={canvasWidth} height={400} ref={stageRef}>
                            <Layer ref={layerRef} scaleX={scale} scaleY={scale}>
                                {(stack.value.length > 0) && stack.value.map((obj) => {
                                    //console.log(obj)
                                    return (
                                        <>
                                            <Rect
                                                x={obj.posX}
                                                y={obj.posY}
                                                width={obj.width}
                                                height={obj.height}
                                                stroke="black"
                                                strokeWidth={2}
                                                key={obj.id}
                                            />
                                            <Text text={obj.value} fontSize={15} key={obj.id2} />
                                        </>
                                    )
                                })}
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