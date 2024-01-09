import { useState } from "react"
import Canvas from "./componenets/Canvas"
import NavBar from "./componenets/Navbar"
import SideBar from "./componenets/SideBar"

function App() {
  const [navBarState, setNavBarState] = useState(false)

  return (
    <>
     <NavBar state={navBarState} setState={setNavBarState}/>
     <Canvas navState={navBarState} setNavBarState={setNavBarState}></Canvas>
     <SideBar></SideBar>
    </>
  )
}

export default App
