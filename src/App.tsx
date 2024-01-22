import { useState } from "react"
import Canvas from "./componenets/Canvas"
import NavBar from "./componenets/Navbar"
import SideBar from "./componenets/SideBar"
import Providers from "./contexts/Providers"

function App() {
  const [navBarState, setNavBarState] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);

  return (
    <>
      <Providers>
        <NavBar state={navBarState} setState={setNavBarState} />
        <Canvas navState={navBarState} setNavBarState={setNavBarState} sideBarState={sideBarState} setSideBarState={setSideBarState}></Canvas>
        <SideBar sideState={sideBarState}></SideBar>
      </Providers>


    </>
  )
}

export default App
