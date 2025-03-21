import AuthForm from "@/components/AuthForm/AuthForm"
import { Link } from "react-router-dom"

const SignInPage = () => {
  return (
    <>
        <div className="auth__content">
            <h1 className="auth__title">Welcome Back</h1>
            <p className="auth__text auth__text-margin">Enter your username and password to access your account</p>
            <AuthForm />
        </div>
        <p className="auth__text">Don’t have an account? <Link to='/auth/signup' className="auth__link">Sign Up</Link></p>
    </>
  )
}

export default SignInPage