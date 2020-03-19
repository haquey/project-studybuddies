
import React from 'react';
import Format from '../main/Format';
import { API } from '../config';

const Signin = () => {
    return (
        <Format 
            title="Log In" 
            desc="Sign in to access your Study Buddy." 
            className="container-fluid"
        >
            {API}
        </Format>
    );
};

export default Signin;
