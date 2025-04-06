import { auth } from '@/app/firebase';
import { TSetState } from '@/types/global';
import { onAuthStateChanged } from 'firebase/auth';

const useCheckAuth = (setUser: TSetState<boolean>) => {

    onAuthStateChanged(auth, (user) => {
        console.log('Проверка пользователя');
        
        if (user) {
            setUser(true)
        } else {
            setUser(false)
        }
    });
}

export default useCheckAuth