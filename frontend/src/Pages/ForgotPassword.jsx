import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/forgotpassword`, {email}, {
				headers : {
					'Content-Type': 'application/json',
				},
				withCredentials : true
			});
			toast.success(response.data.message);
			console.log(response);
			setEmail("");
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

    return (
        <div className="container-fluid">
		<div className="row justify-content-center">
			<div className="col-4">
				<form className="bg-light p-3 mt-3" onSubmit={submitHandler}>
					<h3 className="mb-5 text-center">Forgot Password</h3>
					<div className="form-group">
						<label>Enter your email</label>
						<input type="email" name="email" className="form-control" required onChange={e => setEmail(e.target.value)} value={email}/>
					</div>
					<button type="submit" className="btn btn-primary" disabled={loading}>Find Account</button>
					<p className="text-left">Go back to login <NavLink to="/login">Login</NavLink></p>
				</form>
			</div>
		</div>
	</div>
    );
}

export default ForgotPassword;
