import * as React from 'react';
import { StackContext } from '../contexts/StackContext';
import { CanvasWidthContext } from '../contexts/CanvaWidth';


interface IStackControlsProps {
}

const StackControls: React.FunctionComponent<IStackControlsProps> = (props) => {
    const { stack, setStackValue } = React.useContext(StackContext)
    const { canvasWidth } = React.useContext(CanvasWidthContext)
    const [inputValue, setInputValue] = React.useState<string>("")

    // React.useEffect(() => {
    //     console.log(stack, setStackValue)
    // }, [])

    const getValue = (e: React.BaseSyntheticEvent) => {
        setInputValue(e.target.value)
    }

    const push = () => {
        console.log("clicked");
        if (inputValue.length > 0) {
            console.log("working");
            const newStack = { ...stack }; // Create a new copy of the stack
            newStack.push(inputValue, canvasWidth);
            setStackValue(newStack); // Update the state with the new copy
        }
    };


    return (
        <>
            <input type="text" placeholder='enter a value' onChange={getValue}/>
            <button onClick={push}>Push</button>
            <button>Pop</button>
            <button>Clear</button>
        </>
    );
};

export default StackControls;
