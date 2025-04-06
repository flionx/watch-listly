import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, User } from "firebase/auth";
import { useAppDispatch } from "./useRedux";
import { auth, db, provider } from "@/app/firebase";
import { collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { initialUserState, setUser } from "@/app/store/slices/userSlice";
import { useRef } from "react";
import randomUserId from "@/utils/randomUserId";
import { TSetState } from "@/types/global";
import { IUser } from "@/types/user";

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

                    const q = query(collection(db, "users"), where("uid", "==", user.uid));
                    const querySnapshot = await getDocs(q);

                    if (!querySnapshot.empty) {
                        // There's already a user
                        const existingUser = querySnapshot.docs[0];
                        dispatch(setUser(existingUser.data() as IUser));
                    } else {
                        // if no user
                        const uname = user.displayName?.trim() ? user.displayName : 
                        `user${Math.floor(Math.random() * 9000) + 1000}`; //user4209 (4 nums)
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
                const q = query(collection(db, "users"), where("uid", "==", user.uid));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    // There's already a user
                    const existingUser = querySnapshot.docs[0];
                    dispatch(setUser(existingUser.data() as IUser));
                } else {
                    // if no user
                    const uname = user.displayName?.trim() ? user.displayName : 
                    `user${Math.floor(Math.random() * 9000) + 1000}`; //user4209 (4 nums)
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