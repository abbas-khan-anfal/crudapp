import React, { useContext, useState } from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import centralStore from '../context/Store';

const Navbar = () => {
    const { logoutHandler } = useContext(centralStore);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        try
        {
            if(search.trim == "")
            {
                navigate('/search');
            }
            else
            {
                navigate(`/search/${search.trim()}`);
            }
        }
        catch(error)
        {

        }
    };


    return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <NavLink to="/" className="navbar-brand">Crud App</NavLink>
                <ul className="navbar-nav m-auto">
                    <li className="nav-item"><NavLink to="/" className="nav-link">Home</NavLink></li>
                    <li className="nav-item"><NavLink to="/adddata" className="nav-link">Add Data</NavLink></li>
                </ul>
                <form action="" onSubmit={submitHandler} className='form-inline'>
                    <input type="search" placeholder='search' className='form-control' onChange={(e) =>  setSearch(e.target.value)} value={search} />  
                </form>



                <button className='btn btn-danger logoutBtn' onClick={logoutHandler}>Log out</button>
            </nav>
    );
}

export default Navbar;
