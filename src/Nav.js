import {NavLink} from "react-router-dom";
import React, { useState, useEffect } from 'react';


export default function Nav(){
    return(
        <nav>
            <NavLink
                className = "nav-link selected nav_header mt-5 mb-3"
                exact to="/" 
            >
            HOME
            </NavLink>
            <div className = "nav_header">PLAYLISTS</div>
            <div className = "flex-column">
                <NavLink
                    className = "nav-link selected nav_item"
                    exact to="/playlist/:id/songs" 
                >
                    name 1
                </NavLink>
            </div>
        
        </nav>
    );
}