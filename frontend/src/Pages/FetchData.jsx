import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const FetchData = () => {

  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (page = 1) => {
		setLoading(true);
		try
		{	
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data/fetch?page=${page}`, {
				withCredentials : true
			});
			setDatas(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
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

  const deleteHandler = async (id) => {
		setLoading(true);
      try
      {	
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/data/delete?d_id=${id}`, {
          withCredentials : true
        });
        fetchData(currentPage);
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
    fetchData(currentPage);
  },[currentPage]);

  const handlerPagination = (page) => {
    if(page <= totalPages || currentPage > 1)
    {
      setCurrentPage(page);
    }
  }


  if(loading) return <div>Loading...</div>


    return (
        <div className="container pt-3">
      <div className="row">
        <div className="col-12">
          <h3>All Data</h3>
        </div>

        <div className="col-12 table-responsive-lg table-responsive-sm table-responsive-md">
          <table className='table table-light'>
            <thead>
              <tr>
                <th>Sr:no</th>
                <th>Title</th>
                <th>Img1</th>
                <th>Img2</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                datas.length > 0
                ?
                datas.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1 + (currentPage - 1) * 3}</td>
                    <td>{data.title}</td>
                    <td><img src={data.imgs[0]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} /></td>
                    <td><img src={data.imgs[1]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} /></td>
                    <td><NavLink to={`/updatedata/${data._id}`} className='btn btn-success'><i className="fa-solid fa-square-pen"></i></NavLink></td>
                    <td><button onClick={() => deleteHandler(data._id)} className='btn btn-danger'><i className="fa-solid fa-trash"></i></button></td>
                  </tr>
                ))
                :
                <tr>
                    <td colSpan={6}>Sr:no</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <div className="col-12">
          <ul className="pagination">
              <li className={`page-item ${currentPage == 1 ? 'disabled' : ''}`}><button className="page-link"  onClick={() => handlerPagination(currentPage - 1)}>Previous</button></li>
              {
                [...Array(totalPages)].map((_, i) => (
                  <li key={i} className="page-item"><button className="page-link"  onClick={() => handlerPagination(i + 1)}>{i + 1}</button></li>
                ))
              }

              <li className={`page-item ${currentPage == totalPages ? 'disabled' : ''}`}><button className="page-link" onClick={() => handlerPagination(currentPage + 1)}>Next</button></li>
          </ul>
        </div>

      </div>
    </div>
    );
}

export default FetchData;
