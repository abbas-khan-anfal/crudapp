import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import toast from 'react-hot-toast';

const UpdateData = () => {
	const { d_id } = useParams();
	const [loading, setLoading] = useState(false);
	const [title, setTitle] = useState("");
	const [imgs, setImgs] = useState([]);
	const img1Ref = useRef(null);
	const img2Ref = useRef(null);


	const submitHandler = async (e) => {
		e.preventDefault();
		setLoading(true);
		try
		{
			const formData = new FormData();
			formData.append('title', title);
			formData.append('img1', img1Ref.current.files[0]);
			formData.append('img2', img2Ref.current.files[0]);
			const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/data/update?d_id=${d_id}`, formData, {
				headers : {
					'Content-Type' : 'multipart/form-data',
				},
				withCredentials : true
			});
			toast.success(response.data.message);
			showUpdateData(d_id);
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



	const showUpdateData = async (id) => {
		setLoading(true);
		try
		{	
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data/showupdatedate?d_id=${id}`);
			setTitle(response.data.data.title);
			setImgs(response.data.data.imgs);
		}
		catch(error)
		{
			console.log(error.response?.data.message || error.message);
		}
		finally
		{
			setLoading(false);
		}
	};


	useEffect(() => {
		showUpdateData(d_id);
	},[d_id]);
    return (
        <>
        <Navbar/>
        <div className="container-fluid">
		<div className="row justify-content-center">
			<div className="col-4">
				<form className="bg-light p-3 mt-3" onSubmit={submitHandler}>
					<h3 className="mb-5 text-center">Update Data</h3>
					<div className="form-group">
						<label>Title</label>
						<input type="text" name="title" className="form-control" onChange={(e) => setTitle(e.target.value)} value={title} required/>
					</div>
					<div className="form-group">
						<label>Img 1</label>
						<img src={imgs[0]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} />
						<input type="file" ref={img1Ref} name="img1" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Img 2</label>
						<img src={imgs[1]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} />
						<input type="file" ref={img2Ref} name="img2" className="form-control"/>
					</div>
					
					<button type="submit" disabled={loading} className="btn btn-primary">Update</button>
				</form>
			</div>
		</div>
	</div>
    </>
    );
}

export default UpdateData;
