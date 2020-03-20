import React, {useState} from 'react';
import Format from '../main/Format';
import { API } from '../config';

const Signup = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        success: false
    });


    const { username, password, error, success } = values;

    const changeHandler = attr => e => {
        setValues({ ...values, error: false, [attr]: e.target.value });
    }

    const submitUser = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false});
        console.log(username, password);
        fetch(`${API}/signup`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(res => res.json())
        .then(data => {
            if (data.user) {
                console.log("HERE");
                setValues({ ...values, 
                    error: '',
                    password: '',
                    username: '',
                    success: true
                });
                
            } else {
                console.log(data);
                setValues({ ...values, 
                    error: "Account could not be created.",
                    success: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            setValues({ ...values, 
                error: err,
                success: false
            });

        });
    }

    const signForm = () => (
            <form>
                <div className="form-group">
                    <label className="text-muted">Username</label>
                    <input type="text" className="form-control" onChange={changeHandler('username')} value={username}/>
                </div>
    
                <div className="form-group">
                    <label className="text-muted">Password</label>
                    <input type="password" className="form-control" onChange={changeHandler('password')} value={password}/>
                </div>
                <button className="btn btn-primary" onClick={submitUser}>
                    Submit
                </button>
            </form>
    );
    
    const errorAlert = () => {
        return (
            <div className="alert alert-danger" style={{display: error ? '' : 'none'}}> 
            {error}
        </div>
        )
    }

    const successAlert = () => {
        return (
            <div className="alert alert-success" style={{display: success ? '' : 'none'}}> 
                Your account has been created. Please log in.
            </div>
        )
    }

    return (
        <Format 
            title="Sign Up" 
            desc="Sign up for your own Study Buddy!" 
            className="container-fluid col-md-8 offset-md-2"
        >
            {errorAlert()}
            {successAlert()}
            {signForm()}
        </Format>
    );
};
export default Signup;
