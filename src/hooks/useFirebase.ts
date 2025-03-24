import { auth, db, provider } from "@/app/firebase";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "./useRedux";
import { setUser } from "@/app/store/slices/userSlice";
import { TSetState } from "@/types/global";
import { useRef } from "react";

const useFirebase = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {username} = useParams();
    
    function signUpWithEmail(
        email: string, 
        callback: TSetState<boolean>, 
        setError: TSetState<string | null>
    ) {
        createUserWithEmailAndPassword(auth, email, String(Math.random()))
            .then(async (result) => {
                const user = result.user;
                console.log(user);
                
                const dataRef = doc(db, 'users', user.uid);
                const dataState = {
                    user: username,
                }
                await setDoc(dataRef, dataState);
                callback(true);
                sendVerifEmail(user);
            })
            .catch((error) => {
                setError('Incorrect email or already taken')
                console.log(error.code);
            })
    }
    const intervalRef = useRef<NodeJS.Timeout>(null);
    function sendVerifEmail(user: User) {
        sendEmailVerification(user)
            .then(() => {
                intervalRef.current = setInterval(async () => {
                    if (!user) return
                    await user.reload();
                    
                    if (!user.emailVerified) return;
                    dispatch(setUser({
                        username: username!, 
                        userid: username!, 
                        userIcon: user.photoURL? user.photoURL : '',
                    }))
                    navigate('/auth/signup/create');
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }

                }, 3000)
            })
            .catch((error: unknown) => {
                console.log(error);
            });
    }   

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then(async (result) => {
                const user = result.user;
                const uname = user.displayName || `user${Math.floor(Math.random() * 9000) + 1000}`; //user4209 (4 nums)
                const uicon = user.photoURL || '';
                dispatch(setUser({
                    username: uname, 
                    userid: uname.replace(' ', '_'),
                    userIcon: uicon,
                }))
                const userId = result.user.uid;
                // const dataRef = doc(db, "Users", userId);
                // const userDoc = await getDoc(dataRef);

                // if (userDoc.exists()) {
                //     uploadUserData(userDoc.data() as IUploadData)
                // }
                // else {
                //     const dataState = ...;
                //     await setDoc(dataRef, dataState, { merge: true });
                // }
                navigate('/');

            }).catch((error) => {
                console.log(error);
            })
    }

    const signInWithEmail = (email: string, password: string, setError: TSetState<string | null>) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                
                // const uid = result.user.uid;
                // const dataRef = doc(db, "Users", uid);
                // const userDoc = await getDoc(dataRef);
                // if (userDoc.exists()) {
                //     const userData = userDoc.data() as IUploadData || {};  
                //     uploadUserData({});
                // }
                navigate('/')
            })
            .catch((error) => {
                setError('Incorrect email or password.')
                console.log(error);
            })
    }

    return {signUpWithEmail, sendVerifEmail, signInWithGoogle, signInWithEmail};
}

export default useFirebase