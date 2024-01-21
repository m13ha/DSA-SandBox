import * as React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
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
    const { stack } = React.useContext(StackContext)
    const stageRef = React.useRef<any>(null);
    const layerRef = React.useRef<any>(null);
    const hash = React.useRef(new Map())

    const [scale, setScale] = React.useState(1);

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

    const zoomFuncOut = () => {
        if (scale > 0.2) {
            setScale((prevState: number) => prevState / 1.1);
        }
    }

    const zoomFuncIn = () => {
        if (scale < 3) {
            setScale((prevState: number) => prevState * 1.1);
        }
    };


    const handleWheel = (e: any) => {
        e.evt.preventDefault();

        // adjust the scale based on the wheel movement
        const newScale = e.evt.deltaY > 0 ? scale * 1.1 : scale / 1.1;

        // limit the scale to avoid extreme zoom levels
        const limitedScale = Math.min(Math.max(newScale, 0.2), 2);

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


    //STACKS EVENTS AND DEPENDENCIES

    const handleDragStart = (e: any) => {
        // Get and store the initial position when dragging starts
        const initialPosition = {
            x: e.target.x(),
            y: e.target.y(),
        };

        e.target.to({
            stroke: "blue"
        });

        // Attach the initial position to the target object
        e.target.setAttr('initialPosition', initialPosition);
    };

    const handleDragMove = (e: any) => {
        //console.log(e.target)
        const target = e.target;
        const textElement = hash.current.get(target.name())
    
        if (textElement) {
            textElement.position({
                x: target.x() + (target.width()/3),
                y: target.y() + (target.height()/3),
            });
    
            // Forcing the layer to redraw to reflect the changes
            textElement.getLayer().batchDraw();
        }
    }

    const handleDragEnd = (e: any) => {
        // Retrieve the initial position from the target object
        const target = e.target;
        const initialPosition = e.target.getAttr('initialPosition');

        // Reset the position to the initial position after dragging ends
        e.target.to({
            x: initialPosition.x,
            y: initialPosition.y,
            stroke: "black",
            duration: 0.5, // You can adjust the duration as needed
        });

        const textElement = hash.current.get(target.name())
    
        if (textElement) {
            textElement.to({
                x: initialPosition.x + (target.width()/3),
                y: initialPosition.y + (target.height()/3),
                duration: 0.5,
            });
    
            // Forcing the layer to redraw to reflect the changes
            textElement.getLayer().batchDraw();
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
                        <Stage width={canvasWidth} height={500} ref={stageRef}>
                            <Layer ref={layerRef}
                                scaleX={scale} scaleY={scale}
                            >
                                {(stack.value.length > 0) && stack.value.map((obj) => {
                                    return (
                                        <React.Fragment key={obj.id}>
                                            <Rect
                                                x={obj.posX}
                                                y={obj.posY}
                                                width={obj.width}
                                                height={obj.height}
                                                stroke="black"
                                                fill="white"
                                                strokeWidth={3}
                                                draggable={true}
                                                onDragStart={handleDragStart}
                                                onDragEnd={handleDragEnd}
                                                onDragMove={handleDragMove}
                                                name={obj.id} // Use a string identifier for the name
                                            />
                                            <Text
                                                x={obj.posX + (obj.width / 3)}
                                                y={obj.posY + (obj.height / 3)}
                                                text={obj.value}
                                                fontSize={25}
                                                fill='black'
                                                ref={(text) => {hash.current.set(obj.id, text)}}
                                            />
                                        </React.Fragment>
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