import { useState } from "react"
import Canvas from "./componenets/Canvas"
import NavBar from "./componenets/Navbar"
import SideBar from "./componenets/SideBar"
import Providers from "./contexts/Providers"
import LandingPage from "./routes/LandingPage"
import { useLocation } from "react-router-dom"

function App() {
  const [navBarState, setNavBarState] = useState(false);
  const [sideBarState, setSideBarState] = useState(false);
  const location = useLocation();

  return (
    <>
      {(location.pathname !== "/") ? (<Providers>
        <NavBar state={navBarState} setState={setNavBarState} />
        <Canvas navState={navBarState} setNavBarState={setNavBarState} sideBarState={sideBarState} setSideBarState={setSideBarState}></Canvas>
        <SideBar sideState={sideBarState}></SideBar>
      </Providers>) : (<LandingPage></LandingPage>)}


    </>
  )
}

export default App
