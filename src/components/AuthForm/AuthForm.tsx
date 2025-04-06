import useFirebase from '@/hooks/useFirebase';
import { TSetState } from '@/types/global';
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage';
import { FC, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
interface Props {
    isCreate?: boolean
}

const AuthForm: FC<Props> = ({isCreate = false}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null)
    const [isPassVisible, setIsPassVisible] = useState(false)

    const onChangeName = useCallback<TSetState<string>>((value) => setUsername(value), [])
    const onChangeEmail = useCallback<TSetState<string>>((value) => setEmail(value), [])
    const onChangePassword = useCallback<TSetState<string>>((value) => setPassword(value), [])
    
    const navigate = useNavigate();
    const {signInWithGoogle, signInWithEmail} = useFirebase();
    
    function createUserStart() {
        if (!(username.trim().length > 0)) {
            setError('Incorrect username.')
            return;
        };
        navigate(`/auth/signup/${username}`)        
    }

    function loginWithPassword() {
        if (!email || !(password.trim().length > 0)) {
            setError('Incorrect email or password.')
        };
        signInWithEmail(email, password, setError)
    }

  return (
    <form className="auth__form" onSubmit={(e) => {e.preventDefault()}}>
        {!isCreate ? 
            <>
            <input type="email" placeholder="Enter your email" 
            onChange={(e) => onChangeEmail(e.target.value)}
            value={email} />

            <div className="auth__password auth__password-margin">
                <input type={isPassVisible ? 'text' : 'password'} placeholder="Enter your password"
                    onChange={(e) => onChangePassword(e.target.value)}
                    value={password} 
                />  
                <button className={`auth__password-eye ${!isPassVisible ? 'auth__password-eye-close' : ''}`} 
                    onClick={() => setIsPassVisible(curr => !curr)}>
                </button>
            </div>
            <Link to='/' className="auth__link auth__link-margin">Forgot Password</Link>
        </> : 
            <input type="text" placeholder="Enter your username" 
                onChange={(e) => onChangeName(e.target.value)}
                value={username} 
        />}

        <button className="auth__button"
            onClick={isCreate ? createUserStart : loginWithPassword}>{isCreate ? 'Sign Up' : 'Log In'}</button>
        <button className="auth__button auth__button-google"
        onClick={signInWithGoogle}><span className='icon-google'></span>{isCreate ? 'Sign Up' : 'Log In'} with Google</button>
        {error && <ErrorMessage onClickClose={() => setError(null)}>{error}</ErrorMessage>}
    </form>
  )
}

export default AuthForm