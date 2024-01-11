import * as React from 'react';
import { useLocation } from 'react-router-dom';
import sideBarInfo from "../assets/sideBarInfo.json"
import parse from 'html-react-parser/lib/index';

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = () => {
  let location = useLocation();
  const [codeVisibilty, setCodeVibility] = React.useState(false)

  // GET THE EXPLANATION AND CODE OF CURRENT ROUTE
  const [sideBarText, setSideBarText] = React.useState(() => {
    return sideBarInfo[location.pathname as keyof typeof sideBarInfo]?.text || ""
  })
  const [sideBarCode, setSideBarCode] = React.useState(() => {
    return sideBarInfo[location.pathname as keyof typeof sideBarInfo]?.code || ""
  })

  // CHANGE EXPLANATION AND CODE ON ROUTE CHANGE
  React.useEffect(() => {
    setSideBarText(sideBarInfo[location.pathname as keyof typeof sideBarInfo].text || "")
    setSideBarCode(sideBarInfo[location.pathname as keyof typeof sideBarInfo].code || "")
  }, [location]);


  const changeSideContent = () => {
    if (codeVisibilty) setCodeVibility(false);
    else setCodeVibility(true)
  }

  return (
    <>
      <div className='sideBar'>
        {!codeVisibilty &&
          <><div className='explanation'>{parse(sideBarText)}
            {/* //<a href={sideBarLink} target='_'>Learn More</a> */}
          </div>
          </>
        }
        {codeVisibilty && <div>{parse(sideBarCode)}</div>}
        {!codeVisibilty && <button onClick={changeSideContent}>Code</button>}
        {codeVisibilty && <button onClick={changeSideContent}>Explanation</button>}
      </div>
    </>
  );
};

export default SideBar;
