
import React,{useState}  from 'react';
import Format from '../main/Format';
import { API } from '../config';
import { Redirect } from 'react-router-dom';
import { authenticate } from '../auth';

const Signin = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
        error: '',
        loading: false,
        redirectPage: false
    });


    const { username, password, loading, error, redirectPage } = values;

    const changeHandler = attr => e => {
        setValues({ ...values, error: false, [attr]: e.target.value });
    }

    const submitUser = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true});
        fetch(`${API}/signin`, {
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
                authenticate(data, () => {
                    setValues({ ...values, 
                        loading: false,
                        redirectPage: true
                    });
                })
            } else {
                setValues({ ...values, 
                    error: "Could not sign into account.",
                    loading: false
                });
            }
        })
        .catch(err => {
            console.log(err);
            setValues({ ...values, 
                error: err,
                loading: false
            });
        });
    }

    const redirectLogin = () => {
        if (redirectPage) {
            return <Redirect to="/" />
        }
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

    return (
        <Format 
            title="Log in" 
            desc="Log in to access your Study Buddy!" 
            className="container-fluid col-md-8 offset-md-2"
        >
            {errorAlert()}
            {redirectLogin()}
            {signForm()}
        </Format>
    );
};

export default Signin;
