import * as React from 'react';
import { QueueContext } from '../contexts/QueueContext';
import { CanvasWidthContext } from '../contexts/CanvaWidth';
import { Queue } from '../util/createQueueNode';
import useFocus from '../custom hooks/UseFocus';

interface IQueueControlsProps {
}

const QueueControls: React.FunctionComponent<IQueueControlsProps> = () => {
    const { queue, setQueueValue } = React.useContext(QueueContext)
    const { canvasWidth } = React.useContext(CanvasWidthContext)
    const [inputValue, setInputValue] = React.useState<string>("")
    const [inputRef, setInputRefFocus] = useFocus()

    const getValue = (e: React.BaseSyntheticEvent) => {
        setInputValue(e.target.value);
        e.target.focus()
    }

    const enqueue = () => {
        if (inputValue.length > 0) {
            let newQueue = new Queue(queue.value, queue.size,); // Create a new copy of the Queue
            newQueue.enqueueNode(inputValue, canvasWidth);
            setQueueValue(newQueue); // Update the state with the new copy
        }
        setInputValue("")
        setInputRefFocus();
    };

    const dequeue = () => {
        let newQueue = new Queue(queue.value, queue.size); // Create a new copy of the Queue
        newQueue.dequeueNode()
        setQueueValue(newQueue); // Update the state with the new copy
        setInputValue("")
        setInputRefFocus();
    };

    const clear = () => {
        let newQueue = new Queue(queue.value, queue.size,); // Create a new copy of the Queue
        newQueue.clearQueue()
        setQueueValue(newQueue); // Update the state with the new copy
        setInputValue("")
        setInputRefFocus();
    }

    return (
        <>
            <input type="text" onChange={getValue} value={inputValue} maxLength={3} ref={inputRef}/>
            <button onClick={enqueue}>Enqueue</button>
            <button onClick={dequeue}>Dequeue</button>
            <button  onClick={clear}>Clear</button>
        </>
    );
};

export default QueueControls;