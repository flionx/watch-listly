import { Outlet } from "react-router-dom"
import Footer from "../components/Footer/Footer"
import Header from "../components/Header/Header"

const MainLayout = () => {
  return (
    <>
        <Header />
        <Outlet />
        <Footer />
    </>
  )
}

export default MainLayout