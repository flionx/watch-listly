import useFirebase from '@/hooks/useFirebase';
import ErrorMessage from '@/ui/ErrorMessage/ErrorMessage';
import { useState } from 'react'

const AuthFormEmail = () => {
    const [email, setEmail] = useState('');
    const [hasSent, setHasSent] = useState(false);
    const [error, setError] = useState<string | null>(null)
    const {signUpWithEmail} = useFirebase();

    function confirmEmail() {
        if (!(email.trim().length > 0)) return;
        signUpWithEmail(email, setHasSent, setError)
    }

  return (
    <form className="auth__form" onSubmit={(e) => {e.preventDefault()}}>
      <input type='email' placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          value={email} 
      />  
      <button className="auth__button"
        onClick={confirmEmail}>Confirm email
      </button>
      {hasSent && <p className='auth__text'>A confirmation email was sent to {email}</p>}
      {error && <ErrorMessage onClickClose={() => setError(null)}>{error}</ErrorMessage>}
    </form>
  )
}

export default AuthFormEmail