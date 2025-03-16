import SideBar from "../components/SideBar/SideBar"
import Hero from "../components/Hero/Hero"
import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import { useCallback, useState } from "react"
import { TSetState } from "@/types/global"

const MainPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const callSetOpen = useCallback<TSetState<boolean>>((value) => setIsOpen(value), [])
  
  return (
    <div className="container-main-page">
      <SideBar open={{isOpen, setIsOpen: callSetOpen}}/>
      <div className={`container-main-content ${!isOpen ? 'container-main-content-open' : ''}`}>
        <Header />
        <Hero />
        <Footer />
      </div>
    </div>
  )
}

export default MainPage