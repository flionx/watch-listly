import MainLayout from "@/app/layouts/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "./main/MainPage";
import LibraryPage from "./library/LibraryPage";
import FriendsPage from "./friends/FriendsPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '',
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
    }
])
export default router;