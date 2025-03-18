import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom"
import { TSetState } from "@/types/global";
import SideBar from "@/components/SideBar/SideBar";
import Footer from "@/components/Footer/Footer";

const MainLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
    const callSetOpen = useCallback<TSetState<boolean>>((value) => setIsOpen(value), [])
  
  return (
    <div className="container-main-page">
      <SideBar open={{isOpen, setIsOpen: callSetOpen}}/>
      <div className={`container-main-content ${!isOpen ? 'container-main-content-open' : ''}`}>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout