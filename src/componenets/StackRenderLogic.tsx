import * as React from 'react';
import { StackContext } from '../contexts/StackContext';
import { Rect, Text } from 'react-konva';

interface IStackRenderLogicProps {
}

const StackRenderLogic: React.FunctionComponent<IStackRenderLogicProps> = () => {
  const { stack } = React.useContext(StackContext)
  const hash = React.useRef(new Map())

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
    <React.Fragment>
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
              ref={(text) => { hash.current.set(obj.id, text) }}
            />
          </React.Fragment>
        )
      })}
    </React.Fragment>
  );
};

export default StackRenderLogic;
