import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { useAppDispatch } from "./useRedux";
import { auth, db, provider } from "@/app/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { setUser } from "@/app/store/slices/userSlice";
import { useRef } from "react";
import { TSetState } from "@/types/global";
import { IUser } from "@/types/user";
import useUploadSetUser from "./useUploadSetUser";

const useFirebase = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {username} = useParams();
    const uploadOrSetUser = useUploadSetUser();

    function signUpWithEmail(
        email: string, 
        callback: TSetState<boolean>, 
        setError: TSetState<string | null>
    ) {
        createUserWithEmailAndPassword(auth, email, String(Math.random()))
            .then(async (result) => {
                const user = result.user;                
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

                    await uploadOrSetUser(user, username!);

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
                await uploadOrSetUser(user, username!);

                navigate('/');

            }).catch((error) => {
                console.log(error);
            })
    }

    const signInWithEmail = (email: string, password: string, setError: TSetState<string | null>) => {
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                const firebaseUid = result.user.uid;

                const q = query(collection(db, "users"),
                    where('uid', "==", firebaseUid)
                );
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    const userDoc = querySnapshot.docs[0];
                    dispatch(setUser(userDoc.data() as IUser));
                    navigate('/');
                } else {
                    setError("User data not found.");
                }
            })
            .catch((error) => {
                setError('Incorrect email or password.')
                console.log(error);
            })
    }


    return {signUpWithEmail, sendVerifEmail, signInWithGoogle, signInWithEmail};
}

export default useFirebase