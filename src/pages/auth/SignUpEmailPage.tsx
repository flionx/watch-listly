import AuthFormEmail from "@/components/AuthForm/AuthFormEmail"
import { Link, useParams } from "react-router-dom"

const SignUpEmailPage = () => {
  const {username} = useParams();

  return (
    <>
        <div className="auth__content">
            <h1 className="auth__title">Welcome, {username}!</h1>
            <p className="auth__text auth__text-margin">Enter your email to create an account</p>
            <AuthFormEmail />
        </div>
        <p className="auth__text">Don’t have an account? <Link to='/auth/signup' className="auth__link">Log In</Link></p>
    </>
  )
}

export default SignUpEmailPage