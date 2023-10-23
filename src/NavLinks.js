import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import './App.css';

const NavLinks = props => {
    const auth = useContext(AuthContext);

    return (
        <ul>
            <NavLink to="/" exact>HOME</NavLink>      
            {auth.isLoggedIn && (
                <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
            )}
            {auth.isLoggedIn && (
                <NavLink to="/places/new">ADD PLACE</NavLink>
            )}
            {!auth.isLoggedIn && (
                <NavLink to="/auth">AUTHENTICATE</NavLink>
            )}
            {auth.isLoggedIn && (
                <button onClick={auth.logout}>LOGOUT</button>
            )}
        </ul>
    );
};

export default NavLinks;