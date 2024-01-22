import * as React from 'react';
import { StackContext } from '../contexts/StackContext';
import { CanvasWidthContext } from '../contexts/CanvaWidth';
import { Stack } from '../util/createStackNode';
import useFocus from '../custom hooks/UseFocus';


interface IStackControlsProps {
}

const StackControls: React.FunctionComponent<IStackControlsProps> = () => {
    const { stack, setStackValue } = React.useContext(StackContext)
    const { canvasWidth } = React.useContext(CanvasWidthContext)
    const [inputValue, setInputValue] = React.useState<string>("")
    const [inputRef, setInputRefFocus] = useFocus()

    const getValue = (e: React.BaseSyntheticEvent) => {
        setInputValue(e.target.value);
        e.target.focus()
    }

    const push = () => {
        if (inputValue.length > 0) {
            let newStack = new Stack(stack.value, stack.size,); // Create a new copy of the stack
            newStack.pushNode(inputValue, canvasWidth);
            setStackValue(newStack); // Update the state with the new copy
        }
        setInputValue("")
        setInputRefFocus();
    };

    const pop = () => {
        let newStack = new Stack(stack.value, stack.size,); // Create a new copy of the stack
        newStack.popNode()
        setStackValue(newStack); // Update the state with the new copy
        setInputValue("")
        setInputRefFocus();
    };

    const clear = () => {
        let newStack = new Stack(stack.value, stack.size,); // Create a new copy of the stack
        newStack.clearStack()
        setStackValue(newStack); // Update the state with the new copy
        setInputValue("")
        setInputRefFocus();
    }


    return (
        <>
            <input type="text" onChange={getValue} value={inputValue} maxLength={3} ref={inputRef} />
            <button onClick={push}>Push</button>
            <button onClick={pop}>Pop</button>
            <button onClick={clear}>Clear</button>
        </>
    );
};

export default StackControls;
