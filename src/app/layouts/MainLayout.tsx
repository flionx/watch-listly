import { Outlet } from "react-router-dom"
import SideBar from "@/components/SideBar/SideBar";
import Footer from "@/components/Footer/Footer";
import MobileNavbar from "@/components/MobileNavbar/MobileNavbar";
import useAutoSave from "@/hooks/useAutoSave";

const MainLayout = () => {
  useAutoSave();

  return (
    <div className="container-main-page">
      <SideBar />
      <div className='container-main-content'>
        <Outlet />
        <Footer />
      </div>
      <MobileNavbar />
    </div>
  )
}

export default MainLayout