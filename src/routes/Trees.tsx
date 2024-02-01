import * as React from 'react';
import useFocus from '../custom hooks/UseFocus';
import { TreeBSTContext } from '../contexts/TreeContext';
import { TreeBST } from '../util/createTreeNode';


interface ITreeProps {
}

const Tree: React.FunctionComponent<ITreeProps> = () => {
    const { treeBST, setTreeBSTValue } = React.useContext(TreeBSTContext)
    const [inputValue, setInputValue] = React.useState<number>(0)
    const [inputRef, setInputRefFocus] = useFocus()
    const [status, setStatus] = React.useState<any>(false)

    const getValue = (e: React.BaseSyntheticEvent) => {
        setInputValue(Number(e.target.value));
    }


    const addNode = () => {
        setStatus(false);
        if (inputValue > 0) {
            let newTree = new TreeBST();
            newTree.root = treeBST.root;
            newTree.addNode(inputValue);
            setTreeBSTValue(newTree)
        }
        setInputValue(0)
        setInputRefFocus();
    }

    const deleteNode = () => {
        setStatus(false);
        let newTree = new TreeBST();
        newTree.root = treeBST.root;
        newTree.deleteNode(inputValue);
        setTreeBSTValue(newTree)
        setInputValue(0)
        setInputRefFocus()
    }

    const searchNode = () => {
        setStatus(false);
        if (inputValue > 0) {
            let res = treeBST.searchNode(inputValue)
            setStatus(res)
        }
    }

    const clear = () => {
        let newTree = new TreeBST();
        newTree.root = null;
        setTreeBSTValue(newTree)
        setStatus(false);

    }

    return (
        <>
            {status && <p>Value does not exist in BST</p>}
            <label htmlFor="input">enter a number (1 - 999)</label>
            <input id="input" type="number" onChange={getValue} value={inputValue} min={1} max={999} ref={inputRef} />
            <button onClick={addNode}>Add Node</button>
            <button onClick={deleteNode}>Delete Node</button>
            <button onClick={searchNode}>Search Tree</button>
            <button onClick={clear}>Clear</button>
        </>
    );
};

export default Tree;
