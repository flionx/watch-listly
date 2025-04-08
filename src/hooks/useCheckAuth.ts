import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase';
import { TSetState } from '@/types/global';
import useUploadSetUser from './useUploadSetUser';

const useCheckAuth = (setUser: TSetState<boolean>) => {
    const uploadOrSetUser = useUploadSetUser();

    onAuthStateChanged(auth, (user) => {        
        if (user) {
            setUser(true);
            uploadOrSetUser(user, '');            
        } else {
            setUser(false)
        }
    });
}

export default useCheckAuth