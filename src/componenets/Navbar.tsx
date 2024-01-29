import * as React from 'react';
import "../scss/index.scss"
import { Link, useLocation } from 'react-router-dom';

interface INavBarProps {
  state: boolean;
  setState: Function;
}

const NavBar: React.FunctionComponent<INavBarProps> = ({ state, setState }) => {
  const [activeTab, setActiveTab] = React.useState<any>();

  const location = useLocation();

  const showActiveTab = (e: any) => {
    e.preventDefault
    setActiveTab((prevState: any) => {
      Object.keys(prevState).forEach((key: string) => {
        if (key != location.pathname){
          prevState[key as keyof typeof prevState] = "";
        } 
        else prevState[key as keyof typeof prevState] = "active";
      })

      return prevState
    });
  }

  React.useEffect(() => {
      setActiveTab(() => {
        if(location){
          let obj = {
            "/stacks": "",
            "/queues": "",
            "/trees": "",
            "/lists": "",
            "/graphs": "",
            "/hashtables": "",
          }
      
          obj[location.pathname as keyof typeof obj] = "active"
      
          return obj
        }else {
          return {}
        }
      })
  }, [location])


  const changeDisplayState = (e: any) => {
    e.preventDefault
    setState(false)
  }

  return (
    <>
      {state &&
        <div className="nav">
          <ul>
            <li>
              <span className="material-symbols-outlined" onClick={changeDisplayState}>
                close
              </span>
            </li>
            <li className={activeTab['/stacks']} onClick={showActiveTab}>
              <Link to={"/stacks"}>Stacks</Link>
            </li>
            <li className={activeTab['/queues']} onClick={showActiveTab}>
              <Link to={"/queues"}>Queues</Link>
            </li>
            {/* <li className={activeTab['/lists']} onClick={showActiveTab}>
              <Link to={"/lists"}>Lists</Link>
            </li> */}
            <li className={activeTab['/trees']} onClick={showActiveTab}>
              <Link to={"/trees"}>Trees(BST)</Link>
            </li>
            <li className={activeTab['/graphs']} onClick={showActiveTab}>
              <Link to={"/graphs"}>Graphs</Link>
            </li>
            {/* <li className={activeTab['/hashtables']} onClick={showActiveTab}>
              <Link to={"/hashtables"}>HashTables</Link>
            </li> */}
          </ul>
        </div>

      }
    </>
  )
};

export default NavBar;
