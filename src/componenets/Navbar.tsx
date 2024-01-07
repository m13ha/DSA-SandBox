import * as React from 'react';
import "../scss/index.scss"
import { Link } from 'react-router-dom';

interface INavBarProps {
}

const NavBar: React.FunctionComponent<INavBarProps> = (props) => {
  return (
    <>
      <div className='nav'>
        <ul>
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
    </>
  )
};

export default NavBar;
