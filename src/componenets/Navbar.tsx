import * as React from 'react';
import "../scss/index.scss"
import { Link } from 'react-router-dom';

interface INavBarProps {
  state: boolean;
  setState: Function;
}

const NavBar: React.FunctionComponent<INavBarProps> = ({ state, setState }) => {
  //const [displayState, setDisplayState] = React.useState("nav")


  const changeDisplayState = (e: any) => {
    setState(false)
  }

  // React.useEffect(() => {
  //   if (state) {
  //     setState(false)
  //   } else setState(true)
  // }, [state])



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
            <li>
              <Link to={"/stacks"}>Stacks</Link>
            </li>
            <li>
              <Link to={"/queues"}>Queues</Link>
            </li>
            <li>
              <Link to={"/lists"}>Lists</Link>
            </li>
            <li>
              <Link to={"/trees"}>Trees</Link>
            </li>
            <li>
              <Link to={"/graphs"}>Graphs</Link>
            </li>
            <li>
              <Link to={"/hashtables"}>HashTables</Link>
            </li>
          </ul>
        </div>

      }
    </>
  )
};

export default NavBar;
