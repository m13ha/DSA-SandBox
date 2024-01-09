import * as React from 'react';
import { json, useLocation } from 'react-router-dom';
import sideBarInfo from "../assets/sideBarInfo.json"

interface ISideBarProps {
}

const SideBar: React.FunctionComponent<ISideBarProps> = () => {
  let location = useLocation();
  const [sideBarText, setSideBarText] = React.useState(() => {
    console.log()
    return sideBarInfo[location.pathname as keyof typeof sideBarInfo]?.text || ""
  })
  const [sideBarLink, setSideBarLink] = React.useState(() => {
    return sideBarInfo[location.pathname as keyof typeof sideBarInfo]?.link || ""
  })
  const [sideBarCode, setSideBarCode] = React.useState("")


  React.useEffect(() => {
    setSideBarText(sideBarInfo[location.pathname as keyof typeof sideBarInfo].text || "")
    setSideBarLink(sideBarInfo[location.pathname as keyof typeof sideBarInfo].link || "")
  }, [location]);


  return (
    <>
      <div className='sideBar'>
        <p>{sideBarText}</p>
        <a href={sideBarLink} target='_'>Learn More</a>
        <div>
          <p>{sideBarCode}</p>
        </div>
        <div>
          <button>code</button>
          <button>How it works</button>
        </div>
      </div>
    </>
  );
};

export default SideBar;