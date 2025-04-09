import { auth } from '@/app/firebase';
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage';
import { updatePassword } from 'firebase/auth';
import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
interface IPasswords {
    main: string,
    confirm: string,
}
interface Props {
    buttonText: string,
}

const AuthFormNext:FC<Props> = ({buttonText}) => {
    const [isPassVisible, setIsPassVisible] = useState(false);
    const [passwords, setPasswords] = useState<IPasswords>({
        main: '',
        confirm: '',
    })
    const [error, setError] = useState<string | null>(null)
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
            createWithLogin()         
        } else {
            setError("passwords don't match")
        }
    }
    function createWithLogin() {
        const user = auth.currentUser!;
        updatePassword(user, passwords.main).then(() => {
            navigate('/');
        }).catch((error: unknown) => {
            setError("password must be at least 6 characters long")
            console.log(error);
        });
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

        <button className="auth__button"
            onClick={createAnAccount}>{buttonText}</button>
        {error && <ErrorMessage onClickClose={() => {setError(null)}}>{error}</ErrorMessage>}
    </form>
  )
}

export default AuthFormNext