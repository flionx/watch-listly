import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainPage from '../pages/MainPage'
import CategoriesPage from "../pages/CategoriesPage";
import GenresPage from "../pages/GenresPage";
import MainLayout from "../layouts/MainLayout";

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
                ]
            },
            
            // {
            //     path: 'movie/:movie',
            //     element: <GenresPage />
            // },
        ]
    }
])
export default router;