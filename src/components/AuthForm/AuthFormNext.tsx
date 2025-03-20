import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
interface IPasswords {
    main: string,
    confirm: string,
}

const AuthFormNext = () => {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [passwords, setPasswords] = useState<IPasswords>({
        main: '',
        confirm: '',
    })
    const {username} = useParams();
    const navigate = useNavigate();
    
    function onChangePassword(value: string, type: 'main' | 'confirm') {
        if (type === 'main') {
            setPasswords(curr => ({...curr, main: value}));
        }
        if (type === 'confirm') {
            setPasswords(curr => ({...curr, confirm: value}));
        }
    }
    function createAnAccount() {
        const main = passwords.main.trim();
        const confirm = passwords.confirm.trim();        
        if (!(main.length > 0) || !(confirm.length > 0)) return;
        if (main === confirm) {            
            navigate('/')
        }
    }
  return (
    <form className="auth__form" onSubmit={(e) => {e.preventDefault()}}>
        <div className="auth__password auth__password-margin-bottom">
            <input type={isPassVisible ? 'text' : 'password'} placeholder="Enter new password"
                onChange={(e) => onChangePassword(e.target.value, 'main')}
                value={passwords.main} 
            />  
            <button className={`auth__password-eye ${!isPassVisible ? 'auth__password-eye-close' : ''}`} 
                onClick={() => setIsPassVisible(curr => !curr)}>
            </button>
        </div>
        <input type='password' placeholder="Confirm password"
            onChange={(e) => onChangePassword(e.target.value, 'confirm')}
            value={passwords.confirm} 
        />  
        <Link to='/' className="auth__link auth__link-margin">Forgot Password</Link>

        <button className="auth__button"
            onClick={createAnAccount}>Sign Up</button>
    </form>
  )
}

export default AuthFormNext