import React, { useState } from 'react';
import { useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../../../redux/authSlice';

const Header = () => {
    const navigation = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(setToken({}));
        navigation('/login');
    }
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <div className="navbar-nav">
                    <Dropdown className="nav-item dropdown nav-profile">
                        <Dropdown.Toggle variant="" className="nav-link dropdown-toggle" id="dropdown-basic">
                            <img src="https://via.placeholder.com/30x30" alt="userr" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#" onClick={Logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
}

export default Header;