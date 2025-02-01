import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import axios from 'axios';

const AddData = () => {
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const img1 = useRef(null);
	const img2 = useRef(null);

	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{	
			const formData = new FormData();
			formData.append('title', title);
			formData.append('img1', img1.current.files[0]);
			formData.append('img2', img2.current.files[0]);
			const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/data/add`, formData, {
				headers : {
					'Content-Type' : 'multipart/form-data',
				}
			});
			toast.success(response.data.message);
			setTitle("");
			img1.current.value = "";
			img2.current.value = "";
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
        <>
        <Navbar/>
        <div className="container-fluid">
		<div className="row justify-content-center">
			<div className="col-4">
				<form className="bg-light p-3 mt-3" onSubmit={submitHandler}>
					<h3 className="mb-5 text-center">Add Data</h3>
					<div className="form-group">
						<label>Title</label>
						<input type="text" name="title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} required/>
					</div>
					<div className="form-group">
						<label>Img 1</label>
						<input type="file" name="img1" className="form-control" ref={img1} required/>
					</div>
					<div className="form-group">
						<label>Img 2</label>
						<input type="file" name="img2" className="form-control" ref={img2} required/>
					</div>
					
					<button type="submit" disabled={loading} className="btn btn-primary">Save Data</button>
				</form>
			</div>
		</div>
	</div>
    </>
    );
}

export default AddData;
