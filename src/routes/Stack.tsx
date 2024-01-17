import * as React from 'react';


interface IStackControlsProps {
}

const StackControls: React.FunctionComponent<IStackControlsProps> = (props) => {
    return (
        <>
            <input type="text" placeholder='enter a value' />
            <button>Push</button>
            <button>Pop</button>
            <button>Clear</button>
        </>
    );
};

export default StackControls;
