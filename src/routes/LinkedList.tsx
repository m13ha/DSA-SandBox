import * as React from 'react';

interface IListControlsProps {
}

const ListControls: React.FunctionComponent<IListControlsProps> = (props) => {
    return (
        <>
            <div>
                <input type="text" />
                <button>Append</button>
                <button>Prepend</button>
                <button>PopFirst</button>
                <button>PopLast</button>
            </div>
        </>
    );
};

export default ListControls;