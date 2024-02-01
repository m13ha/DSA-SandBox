import * as React from 'react';
import { Stage, Layer } from 'react-konva';
import { Outlet, useLocation } from "react-router-dom";
import "../scss/_btnStyles.scss"
import { CanvasWidthContext } from '../contexts/CanvaWidth';
import StackRenderLogic from './StackRenderLogic';
import QueueRenderLogic from './QueueRenderLogic';
import TreeBSTRenderLogic from './TreeRenderLogic';
import GraphRenderLogic from './GraphRenderLogic';

interface ICanvasProps {
    navState: boolean;
    setNavBarState: Function;
    sideBarState: boolean;
    setSideBarState: Function;
}

const Canvas: React.FunctionComponent<ICanvasProps> = ({ navState, setNavBarState, setSideBarState, sideBarState }) => {
    const { canvasWidth, setCanvasWidth } = React.useContext(CanvasWidthContext)
    const canvasRef = React.useRef<HTMLDivElement>(null);
    const stageRef = React.useRef<any>(null);
    const layerRef = React.useRef<any>(null);
    const location = useLocation();
    const [scale, setScale] = React.useState(0.4);

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
        if (scale < 4) {
            setScale((prevState: number) => prevState * 1.1);
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
                        <Stage width={window.innerWidth*2} height={window.innerHeight*1.5} ref={stageRef}>
                            <Layer ref={layerRef}
                                scaleX={scale} scaleY={scale}
                            >
                                {(location.pathname === "/stacks") && <StackRenderLogic></StackRenderLogic>}
                                {(location.pathname === "/queues") && <QueueRenderLogic></QueueRenderLogic>}
                                {(location.pathname === "/trees") && <TreeBSTRenderLogic></TreeBSTRenderLogic>}
                                {(location.pathname === "/graphs") && <GraphRenderLogic></GraphRenderLogic>}
                                
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