
import React, {Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return {color: "#eee"};
    } else {
        return {color: "#6c757d"};
    }
};

const NavBar = ({ history }) => {
    return (
        <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
            </li>
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Log In</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
                </li>
                </Fragment>
            )}

            {isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/notebookselect')} to="/notebookselect">My Notebooks</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/upload')} to="/upload">Upload</Link>
                </li>
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
