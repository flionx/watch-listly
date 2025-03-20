import { TSetState } from '@/types/global';
import { FC, useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
interface Props {
    isCreate?: boolean
}

const AuthForm: FC<Props> = ({isCreate = false}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isPassVisible, setIsPassVisible] = useState(false)
    const navigate = useNavigate();

    const onChangeName = useCallback<TSetState<string>>((value) => setUsername(value), [])
    const onChangePassword = useCallback<TSetState<string>>((value) => setPassword(value), [])

    function createUserStart() {
        if (!username) return;
        navigate(`/auth/signup/${username}`)
        console.log('step');
        
    }
    function loginWithPassword() {
        
    }

  return (
    <form className="auth__form" onSubmit={(e) => {e.preventDefault()}}>
        <input type="text" placeholder="Enter your username" 
            onChange={(e) => onChangeName(e.target.value)}
            value={username} 
        />
        {!isCreate && 
        <>
            <div className="auth__password auth__password-margin">
                <input type={isPassVisible ? 'text' : 'password'} placeholder="Enter your password"
                    onChange={(e) => onChangePassword(e.target.value)}
                    value={password} 
                />  
                <button className={`auth__password-eye ${!isPassVisible ? 'auth__password-eye-close' : ''}`} onClick={() => setIsPassVisible(curr => !curr)}></button>
            </div>
            <Link to='/' className="auth__link auth__link-margin">Forgot Password</Link>
        </>
        }

        <button className="auth__button"
            onClick={isCreate ? createUserStart : loginWithPassword}>Sign {isCreate ? 'Up' : 'In'}</button>
        <button className="auth__button auth__button-google">Sign {isCreate ? 'Up' : 'In'} with Google</button>
    </form>
  )
}

export default AuthForm