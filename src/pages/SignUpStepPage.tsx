import AuthFormNext from "@/components/AuthForm/AuthFormNext"
import { Link } from "react-router-dom"

const SignUpStepPage = () => {
  return (
    <>
        <div className="auth__content">
            <h1 className="auth__title">Create an account</h1>
            <p className="auth__text auth__text-margin">Enter new password to create an account</p>
            <AuthFormNext />
        </div>
        <p className="auth__text">Don’t have an account? <Link to='/auth/signup' className="auth__link">Log In</Link></p>
    </>
  )
}

export default SignUpStepPage