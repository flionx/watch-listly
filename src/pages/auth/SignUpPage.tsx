import AuthForm from "@/components/AuthForm/AuthForm"
import { Link } from "react-router-dom"

const SignUpPage = () => {
  return (
    <>
        <div className="auth__content">
            <h1 className="auth__title">Create an account</h1>
            <p className="auth__text auth__text-margin">Enter your username to create an account</p>
            <AuthForm isCreate/>
        </div>
        <p className="auth__text">Already have an account? <Link to='/auth/signin' className="auth__link">Log in</Link></p>
    </>
  )
}

export default SignUpPage