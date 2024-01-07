import * as React from 'react';
import { useRouteError } from "react-router-dom";

interface IErrorProps {
}

const Error: React.FunctionComponent<IErrorProps> = (props) => {
   const error: any = useRouteError();
   console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <a href='./'>go home</a>
    </div>
  );
};


export default Error;
