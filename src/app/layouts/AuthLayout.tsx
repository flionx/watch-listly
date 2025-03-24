import { Link, Outlet } from "react-router-dom"
import banner from '/auth/banner.png?url'
import '@/app/styles/css/auth.css'

const AuthLayout = () => {
  return (
    <section className="auth">
        <div className="auth__banner">
            <img src={banner} alt="banner" />
        </div>
        <div className="auth__main">
            <Link to='/' className="auth__logo"></Link>
            <Outlet />
        </div>
    </section>
  )
}

export default AuthLayout