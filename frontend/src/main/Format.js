
import React from 'react';

const Format = ({
    title, 
    desc, 
    className, 
    children
}) => (
    <div>
        <div className="jumbotron">
            <h3>{title}</h3>
            <p className="lead">{desc}</p>
        </div>
        <div className={className}>{children}</div>
    </div>
);

export default Format;
