
import React from 'react';
import NavBar from './NavBar';

const Format = ({
    title, 
    desc, 
    className, 
    children
}) => (
    <div>
        <NavBar/>
        <div className="jumbotron">
            <h3>{title}</h3>
            <p className="lead">{desc}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Format;
