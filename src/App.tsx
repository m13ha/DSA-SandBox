import { useState } from "react"
import Canvas from "./componenets/Canvas"
import NavBar from "./componenets/Navbar"
import SideBar from "./componenets/SideBar"

function App() {
  const [navBarState, setNavBarState] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  return (
    <>
     <NavBar state={navBarState} setState={setNavBarState}/>
     <Canvas navState={navBarState} setNavBarState={setNavBarState} sideBarState={sideBarState} setSideBarState={setSideBarState}></Canvas>
     <SideBar sideState={sideBarState}></SideBar>
    </>
  )
}

export default App
