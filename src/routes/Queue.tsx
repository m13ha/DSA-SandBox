import * as React from 'react';

interface IQueueControlsProps {
}

const QueueControls: React.FunctionComponent<IQueueControlsProps> = (props) => {
    return (
        <>
            <div>
                <input type="text" />
                <button>Enqueue</button>
                <button>Dequeue</button>
            </div>
        </>
    );
};

export default QueueControls;