import * as React from 'react';
import useFocus from '../custom hooks/UseFocus';
import { Graph, Vertice } from '../util/createGraphNodes';
import { GraphContext } from '../contexts/GraphContext';

interface IGraphsProps {
}

const Graphs: React.FunctionComponent<IGraphsProps> = (props) => {
    const [inputValue, setInputValue] = React.useState("")
    const [inputValue2, setInputValue2] = React.useState("")
    const [inputValue3, setInputValue3] = React.useState("")
    const [inputRef, setInputRefFocus] = useFocus()
    const [status, setStatus] = React.useState<any>(false)
    const { graph, setGraphValue } = React.useContext(GraphContext)


    const addNode = () => {
        // Create a copy of the existing graph
        if (!graph.nodes.has(inputValue) && inputValue.length > 0) {
            let newGraph = new Graph();
            newGraph.nodes = new Map(graph.nodes); // Copy nodes using Map constructor

            // Update other properties
            newGraph.axis[0] = graph.axis[0];
            newGraph.axis[1] = graph.axis[1];
            newGraph.size = graph.size;
            newGraph.edge = new Map(graph.edge); // Copy edge using spread operator

            // Add the new node
            newGraph.addNode(inputValue);

            // Update the graph state
            setGraphValue(newGraph);

            // Reset input and focus
            setInputValue("");
            setInputRefFocus();
        }
    }

    // const deleteEdge = () => {
    //     // Create a copy of the existing graph
    //     if (!graph.nodes.has(inputValue) && inputValue.length > 0) {
    //         let newGraph = new Graph();
    //         newGraph.nodes = new Map(graph.nodes); // Copy nodes using Map constructor

    //         // Update other properties
    //         newGraph.axis[0] = graph.axis[0];
    //         newGraph.axis[1] = graph.axis[1];
    //         newGraph.size = graph.size;
    //         newGraph.edge = new Map(graph.edge); // Copy edge using spread operator

    //         // Add the new node
    //         newGraph.addNode(inputValue);

    //         // Update the graph state
    //         setGraphValue(newGraph);

    //         // Reset input and focus
    //         setInputValue("");
    //         setInputRefFocus();
    //     }
    // }

    const addVertice = () => {
        setStatus((prevState: boolean) => {
            return !prevState
        });
    }

    const createVertice = () => {
        let node1 = graph.nodes.get(inputValue2)
        let node2 = graph.nodes.get(inputValue3)
        if (node1 && node2) {
            const vert = new Vertice(node1.ref.attrs.x, node1.ref.attrs.y, node2.ref.attrs.x, node2.ref.attrs.y);
            let newGraph = new Graph();
            newGraph.nodes = new Map(graph.nodes); // Copy nodes using Map constructor

            // Update other properties
            newGraph.axis[0] = graph.axis[0];
            newGraph.axis[1] = graph.axis[1];
            newGraph.size = graph.size;
            newGraph.edge = new Map(graph.edge);
            newGraph.links = graph.links;

            //new properties
            if (!newGraph.edge.has(`${inputValue2}${inputValue3}`)) {
                newGraph.edge.set(`${inputValue2}${inputValue3}`, vert)
                node1 = newGraph.nodes.get(inputValue2);
                node1?.children.push(inputValue3)
                node2 = newGraph.nodes.get(inputValue3);
                node2?.parent.push(inputValue2)
                newGraph.links++
            }

            //update
            // Update the graph state
            setGraphValue(newGraph);

            // Reset input and focus
            setInputValue2("");
            setInputValue3("");
            setInputRefFocus();
        }
    }

    const clear = () => {
        let newGraph = new Graph();
        // Update the graph state
        setGraphValue(newGraph);

    }

    return (
        <>
            {!status &&
                <>
                    <label htmlFor="input">Enter a value</label>
                    <input id="input" type="text" onChange={(e) => { setInputValue(e.target.value) }} value={inputValue} minLength={1} maxLength={5} ref={inputRef} />
                    <button onClick={addNode}>Add Node</button>
                    <button onClick={addVertice}>Add Edge</button>
                    <button onClick={clear}>Clear</button>
                </>
            }
            {status && <>
                <label htmlFor="input1">Parent Node</label>
                <input id="input1" type="text" onChange={(e) => { setInputValue2(e.target.value) }} value={inputValue2} minLength={1} maxLength={5} />
                <label htmlFor="input2">Child node</label>
                <input id="input2" type="text" onChange={(e) => { setInputValue3(e.target.value) }} value={inputValue3} minLength={1} maxLength={5} />
                <button onClick={createVertice}>Create link</button>
                <button onClick={addVertice}>Cancel</button>
            </>}
        </>
    );
};

export default Graphs;
