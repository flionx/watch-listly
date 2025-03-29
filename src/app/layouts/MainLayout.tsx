import { Outlet } from "react-router-dom"
import SideBar from "@/components/SideBar/SideBar";
import Footer from "@/components/Footer/Footer";

const MainLayout = () => {
  
  return (
    <div className="container-main-page">
      <SideBar />
      <div className='container-main-content'>
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default MainLayout