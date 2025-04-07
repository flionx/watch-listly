import { useCallback } from 'react'
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { initialUserState, setUser } from '@/app/store/slices/userSlice';
import { useAppDispatch } from './useRedux';
import { db } from '@/app/firebase';
import randomUserId from '@/utils/randomUserId';
import { IUser } from '@/types/user';
import { User } from 'firebase/auth';

const useUploadSetUser = () => {
    const dispatch = useAppDispatch();

    const uploadOrSetUser = useCallback(async(user: User, username: string) => {
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            // There's already a user
            const existingUser = querySnapshot.docs[0];
            dispatch(setUser(existingUser.data() as IUser));
        } else {
            // if no user
            const uname = user.displayName?.trim() ? user.displayName : username!;
            const uicon = user.photoURL || '';
            const newUserId = randomUserId();
            const dataState = {
                ...initialUserState,
                uid: user.uid,
                id: newUserId,
                username: uname,
                avatar: uicon,
            }
            const dataRef = doc(db, "users", newUserId);
            await setDoc(dataRef, dataState);
            dispatch(setUser(dataState));
        }
    }, [])

  return uploadOrSetUser;
}

export default useUploadSetUser