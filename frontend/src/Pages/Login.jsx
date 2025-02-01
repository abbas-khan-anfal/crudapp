import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import centralStore from '../context/Store';

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const { setUserState } = useContext(centralStore);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{	
			const userObj = { email, password };
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, userObj, {
				headers : {
					'Content-Type': 'application/json',
				}
			});
			toast.success(response.data.message);
			setEmail("");
			setPassword("");
			navigate('/');
			setUserState(true);
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
					<h3 className="mb-5 text-center">Login</h3>
					<div className="form-group">
						<label>Email</label>
						<input type="email" name="email" className="form-control" onChange={(e) => setEmail(e.target.value)} value={email} required/>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input type="password" name="password" className="form-control" onChange={(e) => setPassword(e.target.value)} value={password} required/>
						<NavLink to="/forgotpassword">forgot password</NavLink>
					</div>
					<button type="submit" className="btn btn-primary" disabled={loading}>Login</button>
					<p className="text-left">Create New Account <NavLink to="/signup">Signup</NavLink></p>
				</form>
			</div>
		</div>
	</div>
    );
}

export default Login;
