import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const SearchData = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { search } = useParams();

  const fetchData = async (searchTerm) => {
		setLoading(true);
		try
		{	
			const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/data/searchdata/${searchTerm}`, {
				withCredentials : true
			});
			setData(response.data.data);
		}
		catch(error)
		{
			console.error(error.response?.data.message || error.message);
		}
		finally
		{
			setLoading(false);
		}
	};


  useEffect(() => {
    const trimmedSearch = search.trim();
    fetchData(trimmedSearch);
  },[search]);


    return (
        <>
        <Navbar/>
        <div className="container pt-3">
      <div className="row">
        <div className="col-12">
          <h3>Searched Result : {search}</h3>
          <span>{data.length} result found</span>
        </div>

        <div className="col-12 table-responsive-lg table-responsive-sm table-responsive-md">
          <table className='table table-light'>
            <thead>
              <tr>
                <th>Sr:no</th>
                <th>Title</th>
                <th>img1</th>
                <th>img2</th>
              </tr>
            </thead>
            <tbody>
            {
                data.length > 0
                ?
                data.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.title}</td>
                    <td><img src={data.imgs[0]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} /></td>
                    <td><img src={data.imgs[1]} alt="" style={{width:'50px', height:'50px', borderRadius:'5px'}} /></td>
                  </tr>
                ))
                :
                <tr>
                    <td colSpan={4}>Sr:no</td>
                </tr>
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
    </>
    );
}

export default SearchData;
