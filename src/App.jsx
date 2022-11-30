import React, { useEffect, useState } from 'react'
import AddJob from './pages/AddJob';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import ProtectedRoute from './components/ProtectedRoute';


function App() {
    const [user, setUser] = useState(false);

    const router = createBrowserRouter([
        {
            path: "/",
            element:
                <ProtectedRoute user={user}>
                    <Home />
                </ProtectedRoute>
            ,
        },
        {
            path: "/add-job",
            element:
                <ProtectedRoute user={user}>
                    <AddJob />
                </ProtectedRoute>
            ,
        },
        {
            path: "/login",
            element: user ? <Navigate to="/" replace /> : <SignIn />,
        },
        {
            path: "/sign-up",
            element: user ? <Navigate to="/" replace /> : <SignUp />,
        },
    ]);

    function getItemFromLocalStorage() {
        const items = JSON.parse(localStorage.getItem('user'));
        if (items) {
            setUser(items?.access?.length > 0);
        }
        else {
            setUser(null)
        }
    }
    useEffect(() => {
        getItemFromLocalStorage();
    }, []);

    window.addEventListener('storage', () => {
        getItemFromLocalStorage();
    });

    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default App