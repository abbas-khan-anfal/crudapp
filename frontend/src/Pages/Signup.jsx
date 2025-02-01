import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios'
import toast from 'react-hot-toast';

const Signup = () => {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{	
			const userObj = {username, email, password};
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/signup`, userObj, {
				headers : {
					'Content-Type': 'application/json',
				}
			});
			toast.success(response.data.message);
			setUsername("");
			setEmail("");
			setPassword("");
			navigate('/login');
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
					<h3 className="mb-5 text-center">Signup</h3>
					<div className="form-group">
						<label>Username</label>
						<input type="text" name="username" className="form-control" onChange={(e) => setUsername(e.target.value)} value={username} required/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} required/>
					</div>
					<button type="submit" className="btn btn-primary" disabled={loading}>Signup</button>
					<p className="text-left">Already have an account? <NavLink to="/login">Login</NavLink></p>
				</form>
			</div>
		</div>
	</div>
    );
}

export default Signup;
