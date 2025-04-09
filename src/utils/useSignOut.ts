import { setUser } from "@/app/store/slices/userSlice";
import { useAppDispatch } from "@/hooks/useRedux";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useSignOut = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    
    function signOutUser() {
        const auth = getAuth();

        signOut(auth)
        .then(() => {
            // reset user state
            dispatch(setUser({
                id: '',
                uid: '',
                username: '',
                avatar: '',
                cover: '',
                listsVisibility: 'everybody',
                seenList: [],
                wantList: [],
                lists: [],
                friends: [],
                loading: 'idle',
            }))
            navigate('/');
        })
        .catch((error) => {
            console.error("Exit error:", error);
        });
    }
    return signOutUser;    

}

export default useSignOut
