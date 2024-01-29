import * as React from 'react';
import { TreeBSTContext } from '../contexts/TreeContext';
import { Circle, Text, Line } from 'react-konva';
import { TreeNode } from '../util/createTreeNode';

interface ITreeBSTRenderLogicProps {
}

const TreeBSTRenderLogic: React.FunctionComponent<ITreeBSTRenderLogicProps> = () => {
    const { treeBST } = React.useContext(TreeBSTContext)
    const hash = React.useRef(new Map())

    //TreeBSTS EVENTS AND DEPENDENCIES

    const handleDragStart = (e: any) => {
        // Get and store the initial position when dragging starts
        const initialPosition = {
            x: e.target.x(),
            y: e.target.y(),
        };

        e.target.to({
            stroke: "blue"
        });

        // Attach the initial position to the target nodeect
        e.target.setAttr('initialPosition', initialPosition);
    };

    const handleDragMove = (e: any) => {
        //console.log(e.target)
        const target = e.target;
        const textElement = hash.current.get(target.name())

        if (textElement) {
            textElement.position({
                x: target.x() - 7,
                y: target.y() - 7,
            });

            // Forcing the layer to redraw to reflect the changes
            textElement.getLayer().batchDraw();
        }
    }

    const handleDragEnd = (e: any) => {
        // Retrieve the initial position from the target nodeect
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
                x: initialPosition.x - 7,
                y: initialPosition.y - 7,
                duration: 0.5,
            });

            // Forcing the layer to redraw to reflect the changes
            textElement.getLayer().batchDraw();
        }
    };

    const renderNodes = (node: TreeNode) => {
        if (node) {
            return (
                <React.Fragment>
                    <Circle
                        x={node.posX}
                        y={node.posY}
                        width={node.width}
                        height={node.height}
                        stroke="black"
                        fill="white"
                        strokeWidth={2}
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragMove={handleDragMove}
                        name={node.id}
                        ref={(ref) => {node.ref = ref}} // Use a string identifier for the name
                    />
                    <Text
                        x={node.posX - 5}
                        y={node.posY - 5}
                        text={`${node.value}`}
                        fontSize={10}
                        fill='black'
                        ref={(text) => { hash.current.set(node.id, text) }}
                    />
                    {(node.left !== null) && <Line
                        points={[node.posX, node.posY + 20, node.left.posX, node.left.posY]}
                        stroke='black'
                        strokeWidth={1}
                    />}
                    {(node.right !== null) && <Line
                        points={[node.posX, node.posY + 20, node.right.posX, node.right.posY]}
                        stroke='black'
                        strokeWidth={1}
                    />}
                    {(node.left !== null) && renderNodes(node.left)}
                    {(node.right !== null) && renderNodes(node.right)}
                </React.Fragment>
            )
        }
    }

    return (
        <React.Fragment>
            {(treeBST.root !== null) && renderNodes(treeBST.root)}
        </React.Fragment>
    );
};

export default TreeBSTRenderLogic;