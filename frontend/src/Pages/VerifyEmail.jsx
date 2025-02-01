import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
    // get the query parameter, user react router dom func
    const [ searchParams ] = useSearchParams();
    const token = searchParams.get('token');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const verifyEmail = async (isToken) => {
		setLoading(true);
		try
		{	
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/verifyemail?token=${isToken}`);
            console.log(response);
        }
        catch(error)
        {
            toast.error(error.response?.data.message || error.message);
        }
        finally
        {
            setLoading(false);
        }
	    };

        useEffect(() => {
            verifyEmail(token);
        }, [token]);


    return (
        <div>
            <h1>Email Verification Successfull</h1>
            <button onClick={() => navigate('/createnewpassword', { state: true })}>
      Reset Password
    </button>
        </div>
    );
}

export default VerifyEmail;
