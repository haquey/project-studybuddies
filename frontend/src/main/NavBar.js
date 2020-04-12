
import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';
import { Icon } from 'semantic-ui-react'
import "./externalStyles.css";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#eee"};
    } else {
        return {color: "#6c757d"};
    }
};

const NavBar = ({ history }) => {
    return (
        <div className="row mx-auto">
        <ul className="nav nav-tabs mainNavbar col-md-10">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/"><Icon name='home'/>Home</Link>
            </li>

            {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/notebookselect')} to="/notebookselect"><Icon name='book'/>My Notebooks</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/search')} to="/search"><Icon name='search'/>Search</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/upload')} to="/upload"><Icon name='upload'/>Upload</Link>
                </li>
                </Fragment>
            )}
        </ul>
        <ul className="nav nav-tabs mainNavbar col-md-2 justify-content-end">
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin"><Icon name='sign in'/>Log In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signup')} to="/signup"><Icon name='user plus'/>Sign Up</Link>
                </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <span 
                        className="nav-link" 
                        style={{cursor: "pointer", color: "#ff7979"}} 
                        onClick={() =>{
                            signout(()=> {
                                history.push("/");
                            })
                        }}
                    >
                        <Icon name='sign out'/>
                        Sign Out
                    </span>
                </li>
                </Fragment>
            )}

        </ul>
    </div>
    )
};

export default withRouter(NavBar);
