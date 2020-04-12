
import React from 'react';
import Format from './Format';
import { Link, withRouter } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <Format 
                title="Welcome to Study Buddy" 
                desc="Study Buddy is a collaborative digital notebook tool." 
                className="container-fluid">
            </Format>
            <div>
                <Link className="nav-link" to="/credits">Credits</Link>
            </div>
        </div>
        
    );
};
export default Home;
