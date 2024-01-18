import { useState } from "react"
import Canvas from "./componenets/Canvas"
import NavBar from "./componenets/Navbar"
import SideBar from "./componenets/SideBar"
import { CanvasWidthContextProvider } from "./contexts/CanvaWidth"
import { StackContextProvider } from './contexts/StackContext';

function App() {
  const [navBarState, setNavBarState] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  return (
    <>
      <StackContextProvider>
        <CanvasWidthContextProvider>
          <NavBar state={navBarState} setState={setNavBarState} />
          <Canvas navState={navBarState} setNavBarState={setNavBarState} sideBarState={sideBarState} setSideBarState={setSideBarState}></Canvas>
          <SideBar sideState={sideBarState}></SideBar>
        </CanvasWidthContextProvider>
      </StackContextProvider>

    </>
  )
}

export default App
