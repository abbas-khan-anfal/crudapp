import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import ForgotPassword from './Pages/ForgotPassword';
import CreateNewPassword from './Pages/CreateNewPassword';
import AddData from './Pages/AddData';
import Home from './Pages/Home';
import UpdateData from './Pages/UpdateData';
import SearchData from './Pages/SearchData';
import { Toaster } from 'react-hot-toast';
import centralStore from './context/Store';
import PublicRoute from './PublicRoute';
import VerifyEmail from './Pages/VerifyEmail';

const App = () => {
    const { userState, isAuthenticated } = useContext(centralStore);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            await isAuthenticated();
            setLoading(false);
        };
    
        checkAuth();
    }, []);
    

    if (loading) {
        return <div>Loading...</div>; // Show a loading spinner while checking authentication
    }

    return (
        <Router>
            <Toaster />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<PublicRoute element={<Login />} isPublic />} />
                <Route path="/signup" element={<PublicRoute element={<Signup />} isPublic />} />
                <Route path="/forgotpassword" element={<PublicRoute element={<ForgotPassword />} isPublic />} />
                <Route path="/createnewpassword" element={<PublicRoute element={<CreateNewPassword />} isPublic />} />
                <Route path="/verify-email" element={<PublicRoute element={<VerifyEmail />} isPublic />} />

                {/* Private Routes */}
                <Route path="/" element={<PublicRoute element={<Home />} isPublic={false} />} />
                <Route path="/adddata" element={<PublicRoute element={<AddData />} isPublic={false} />} />
                <Route path="/updatedata/:d_id" element={<PublicRoute element={<UpdateData />} isPublic={false} />} />
                <Route path="/search/:search" element={<PublicRoute element={<SearchData />} isPublic={false} />} />
                <Route path="/search" element={<PublicRoute element={<div>Search term is empty! try serach something.</div>} isPublic={false} />} />

                {/* Catch-all Route */}
                <Route path="*" element={<div>Page Not Found 404!</div>} />
            </Routes>
        </Router>
    );
};

export default App;
