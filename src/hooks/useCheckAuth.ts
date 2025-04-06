import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { TSetState } from '@/types/global';
import { useAppDispatch } from './useRedux';
import { getUserData } from '@/app/store/thunks/user/getUserInfo';

const useCheckAuth = (setUser: TSetState<boolean>) => {
    const dispatch = useAppDispatch();

    onAuthStateChanged(auth, (user) => {        
        if (user) {
            setUser(true);
            dispatch(getUserData(user.uid));
            
        } else {
            setUser(false)
        }
    });
}

export default useCheckAuth