import { useState } from 'react'
import centralStore from './Store.js'
import axios from 'axios';
import toast from 'react-hot-toast';

const StoreProvider = ({ children }) => {

    const [userState, setUserState] = useState(false);

    const isAuthenticated = async () => {
		try
		{
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/getuser`, {
				withCredentials : true
			});
            setUserState(true);
		}
		catch(error)
		{
			toast.error(error.response?.data.message || error.message);
            setUserState(false);
		}
	};

    const logoutHandler = async () => {
		try
		{
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/logout`, {
				withCredentials : true
			});
            setUserState(false);
		}
		catch(error)
		{
			toast.error(error.response?.data.message || error.message);
            setUserState(false);
		}
	};


    return (
        <centralStore.Provider value={{
            userState, setUserState, isAuthenticated, logoutHandler
            }}>
            {children}
        </centralStore.Provider>
    )
}

export default StoreProvider