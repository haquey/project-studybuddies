
import React from 'react';
import { Link, withRouter } from 'react-router-dom';

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
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Log In</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Sign Up</Link>
            </li>
        </ul>
    </div>
    )
};

export default withRouter(NavBar);
