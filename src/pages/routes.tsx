import MainLayout from "@/app/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import LibraryPage from "./LibraryPage";
import FriendsPage from "./FriendsPage";
import AuthLayout from "@/app/layouts/AuthLayout";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import ErrorPage from "./ErrorPage";
import SignUpStepPage from "./SignUpStepPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: 'library',
                element: <LibraryPage />
            },
            {
                path: 'friends',
                element: <FriendsPage />
            },
            
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'signup',
                element: <SignUpPage />,
            },
            {
                path: 'signin',
                element: <SignInPage />,
            },
            {
                path: '/auth/signup/:username',
                element: <SignUpStepPage />,
            }
        ]
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
])
export default router;