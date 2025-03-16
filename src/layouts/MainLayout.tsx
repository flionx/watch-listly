import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"
import SideBar from "../components/SideBar/SideBar";
import { useCallback, useState } from "react";
import { TSetState } from "@/types/global";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
    const callSetOpen = useCallback<TSetState<boolean>>((value) => setIsOpen(value), [])
  
  return (
    <div className="container-main-page">
      <SideBar open={{isOpen, setIsOpen: callSetOpen}}/>
      <div className={`container-main-content ${!isOpen ? 'container-main-content-open' : ''}`}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout