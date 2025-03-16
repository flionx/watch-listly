import { createBrowserRouter } from "react-router-dom";

import LibraryPage from "@/pages/LibraryPage";
import App from "@/App";
import MainLayout from "@/layouts/MainLayout";
import MainPage from "@/pages/MainPage";
import CategoriesPage from "@/pages/CategoriesPage";
import GenresPage from "@/pages/GenresPage";
import FriendsPage from "@/pages/FriendsPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <MainLayout />,
                children: [
                    {
                        path: '',
                        element: <MainPage />
                    },
                    {
                        path: 'categories',
                        element: <CategoriesPage />
                    },
                    {
                        path: 'genres',
                        element: <GenresPage />
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
        ]
    }
])
export default router;