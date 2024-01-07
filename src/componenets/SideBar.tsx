import * as React from 'react';

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = (props) => {
  return (
    <>
        <div>code</div>
        <div>How it works</div>
        <div>
            <button>code</button>
            <button>How it works</button>
        </div>
    </>
  );
};

export default SideBar;
