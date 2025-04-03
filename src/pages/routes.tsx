import MainLayout from "@/app/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./MainPage";
import LibraryPage from "./LibraryPage";
import FriendsPage from "./FriendsPage";
import AuthLayout from "@/app/layouts/AuthLayout";
import SignInPage from "./auth/SignInPage";
import SignUpPage from "./auth/SignUpPage";
import ErrorPage from "./ErrorPage";
import SignUpStepPage from "./auth/SignUpStepPage";
import SignUpEmailPage from "./auth/SignUpEmailPage";
import MoviePage from "./MoviePage";
import ProfilePage from "./ProfilePage";


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
            {
                path: ':type/:id',
                element: <MoviePage />
            },

            {
                path: 'user/:id',
                element: <ProfilePage />
            }
            
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'signin',
                element: <SignInPage />,
            },
            {
                path: 'signup',
                element: <SignUpPage />,
            },
            {
                path: '/auth/signup/:username',
                element: <SignUpEmailPage />,
            },
            {
                path: '/auth/signup/create',
                element: <SignUpStepPage />,
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />,
    },
])
export default router;