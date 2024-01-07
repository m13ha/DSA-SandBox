import * as React from 'react';

interface IStackControlsProps {
}

const StackControls: React.FunctionComponent<IStackControlsProps> = (props) => {
    return (
        <>
            <div>
                <input type="text" />
                <button>Push</button>
                <button>Pop</button>
            </div>
        </>
    );
};

export default StackControls;
