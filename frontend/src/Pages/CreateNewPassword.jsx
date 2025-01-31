import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const CreateNewPassword = () => {
	const location = useLocation();
	console.log(location.state)
    return (
        <div className="container-fluid">
		<div className="row justify-content-center">
			<div className="col-4">
				<form className="bg-light p-3 mt-3">
					<h3 className="mb-5 text-center">Create New Password</h3>
					<div className="form-group">
						<label>New Password</label>
						<input type="password" name="password" className="form-control" required/>
					</div>
                    <div className="form-group">
						<label>Confirm Password</label>
						<input type="password" name="password" className="form-control" required/>
					</div>
					<button type="submit" className="btn btn-primary">Save Password</button>
					<p className="text-left">Go back to login <NavLink to="/login">Login</NavLink></p>
				</form>
			</div>
		</div>
	</div>
    );
}

export default CreateNewPassword;
