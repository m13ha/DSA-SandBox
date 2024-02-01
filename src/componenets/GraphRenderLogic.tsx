import * as React from 'react';
import { GraphContext } from '../contexts/GraphContext';
import { Circle, Text, Arrow } from 'react-konva';
import {  Edge } from '../util/createGraphNodes';

interface IGraphRenderLogicProps {
}

const GraphRenderLogic: React.FunctionComponent<IGraphRenderLogicProps> = () => {
    const { graph } = React.useContext(GraphContext)
    const hash = React.useRef(new Map())

    //GraphS EVENTS AND DEPENDENCIES

    const handleDragStart = (e: any) => {
        // Get and store the initial position when dragging starts
        const initialPosition = {
            x: e.target.x(),
            y: e.target.y(),
        };

        // Attach the initial position to the target nodeect
        e.target.setAttr('initialPosition', initialPosition);
    };

    const handleDragMove = (e: any) => {
        //console.log(e.target)
        const target = e.target;
        const textElement = hash.current.get(target.name())
        //reRenderLinks(e.target.attrs.id);

        if (textElement) {
            textElement.position({
                x: target.x() - 10,
                y: target.y() + 40,
            });

            // Forcing the layer to redraw to reflect the changes
            textElement.getLayer().batchDraw();
        }
    }

    const handleDragEnd = (e: any) => {
        // Retrieve the initial position from the target nodeect
        const target = e.target;
        const textElement = hash.current.get(target.name())
        reRenderLinks(e.target.attrs.id);

        if (textElement) {
            textElement.getLayer().batchDraw();
        }
    };

    const renderNodes = (node: any, count: number) => {
        let graphNode = node.next().value;
        let counts = count;
        if (counts > 0 && graphNode !== undefined) {
            return (
                <React.Fragment>
                    <Circle
                        x={graphNode.ref? graphNode.ref.x() : graphNode.posX}
                        y={graphNode.ref? graphNode.ref.y() : graphNode.posY}
                        width={graphNode.width}
                        height={graphNode.height}
                        stroke="black"
                        fill="white"
                        strokeWidth={2}
                        draggable={true}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        onDragMove={handleDragMove}
                        name={graphNode.id}
                        id={graphNode.value}
                        ref={(ref) => { graphNode.ref = ref }} // Use a string identifier for the name
                    />
                    <Text
                        x={(graphNode.ref? graphNode.ref.x() : graphNode.posX) - 10}
                        y={(graphNode.ref? graphNode.ref.y() : graphNode.posY) + 40}
                        text={`${graphNode.value}`}
                        fontSize={16}
                        ref={(text) => { hash.current.set(graphNode.id, text) }}
                    />
                    {renderNodes(node, counts--)}
                </React.Fragment>
            )
        }
    }

    const renderLines = (line: any, count: number) => {
        let graphLine: Edge = line.next().value;
        let counts = count;
        if (counts > 0 && graphLine !== undefined) {
            return (
                <React.Fragment>
                    <Arrow
                        points={graphLine.ref ? graphLine.ref.points() : [graphLine.posX1, graphLine.posY1, graphLine.posX2, graphLine.posY2]}
                        stroke='black'
                        strokeWidth={2}
                        name={graphLine.id}
                        ref={(ref) => { graphLine.ref = ref }}
                    />
                    {renderLines(line, counts--)}
                </React.Fragment>
            )
        }
    }

    const reRenderLinks = (name: string) => {
        let node = graph.nodes.get(name);
        if (node) {
            node.children.forEach((child) => {
                let vertice = graph.edge.get(`${node?.value}${child}`);
                let node2 = graph.nodes.get(child);
                if (vertice) {
                    vertice?.ref.to({
                        points: [node?.ref.x(), node?.ref.y(), node2?.ref.x(), node2?.ref.y()]
                    })
                }
            })
            node.parent.forEach((parent) => {
                let vertice = graph.edge.get(`${parent}${node?.value}`);
                let node2 = graph.nodes.get(parent);
                if (vertice) {
                    vertice?.ref.to({
                        points: [node2?.ref.x(), node2?.ref.y(), node?.ref.x(), node?.ref.y()]
                    })
                }
            })
        }
    }

    return (
        <React.Fragment>
            {(graph.size > 0) && renderNodes(graph.nodes.values(), graph.size)}
            {(graph.size > 0) && renderLines(graph.edge.values(), graph.links)}
        </React.Fragment>
    )

}

export default GraphRenderLogic;