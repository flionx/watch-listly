import useCurrentUserId from './useCurrentUserId';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { IUser } from '@/types/user';

const useFetchList = (id: string) => {
  const {currentUser, isCurrentUser, user, setUser, loading, setLoading} = 
        useCurrentUserId(id, fetchUser);

    async function fetchUser() {
        try {
            if (isCurrentUser) return;
            setLoading(true);

            const docRef = doc(db, 'users', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const user = docSnap.data() as IUser;  
                setUser(user); 
            }
    
        } catch (err: unknown) {
            console.error("Error fetching user list:", err);
        } 
        finally {
            setLoading(false);
        }
    }

    return {
        loading, 
        isCurrentUser,
        user: isCurrentUser ? currentUser : user, 
    }
}

export default useFetchList
