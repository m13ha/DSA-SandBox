import * as React from 'react';

interface IQueueControlsProps {
}

const QueueControls: React.FunctionComponent<IQueueControlsProps> = () => {
    return (
        <>
            <input type="text" />
            <button>Enqueue</button>
            <button>Dequeue</button>
            <button>Clear</button>
        </>
    );
};

export default QueueControls;