import * as React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Outlet } from "react-router-dom";


interface ICanvasProps {
    navState: boolean;
    setNavBarState: Function;
}

const Canvas: React.FunctionComponent<ICanvasProps> = ({ navState, setNavBarState }) => {

    const changeNavDisplayState = (e: any) => {
        setNavBarState(true)
    }

    return (
        <>
            <div className='canvasContainer'>
                {!navState && 
                <span className="material-symbols-outlined" onClick={changeNavDisplayState}>
                    Menu
                </span>
                }
                <Stage className='canvas'>
                    <Layer>

                    </Layer>
                </Stage>
                <div className='zoomBtns'>
                    <button>+</button>
                    <button>-</button>
                </div>
                <div id="controls">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Canvas;
