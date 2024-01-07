import * as React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Outlet } from "react-router-dom";


interface ICanvasProps {
}

const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
    return (
        <>
            <div className='canvasContainer'>
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
