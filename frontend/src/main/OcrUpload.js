import React, {useState, useEffect} from 'react';
import Format from '../main/Format';
import { API } from '../config';

const OcrUpload = () => {
    const [values, setValues] = useState({
        files: null,
        error: '',
        success: false,
        notebooks: [],
        notebook: '',
        subjects: [],
        subject: ''
    });


    const { files, error, success, notebooks, subjects, notebook, subject } = values;

    const changeHandlerFile = attr => e => {
        setValues({ ...values, error: false, [attr]: e.target.files });
    }
    
    const changeHandler = attr => e => {
        setValues({ ...values, error: false, [attr]: e.target.value });
    }

    const changeHandlerNotebook = attr => e => {
        console.log(e.target.value);
        setValues({ ...values, error: false, notebook: e.target.value });
        fetch(`${API}/user/${JSON.parse(localStorage.getItem('jwt')).user._id}/notebook/${notebook}/subject/`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('jwt')).token
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("fetched subjects", data);
            setValues({...values, subjects: data, subject: data[0]._id});
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getNotebooks = () => {
        console.log("HELLO");
        fetch(`${API}/user/${JSON.parse(localStorage.getItem('jwt')).user._id}/notebook/`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('jwt')).token
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log("fetched notebooks", data);
            setValues({...values, notebooks: data, notebook: data[0]._id});
        })
        .catch(err => {
            console.log(err);
            setValues({...values, error: "An error has occured."});
        });
    }

    useEffect(() => {
        getNotebooks();
        console.log("here");
    }, []);

    const submitOcr = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false});
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('subjectId', subject);
        formData.append('notebookId', notebook);
        fetch(`${API}/user/${JSON.parse(localStorage.getItem('jwt')).user._id}/page/ocr`, {
            method: "POST",
            headers: {
                'Authorization': 'Bearer ' +  JSON.parse(localStorage.getItem('jwt')).token
            },
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setValues({ ...values, 
                        error: '',
                        success: true
                    });
            // if (data.user) {
            //     console.log("HERE");
            //     setValues({ ...values, 
            //         error: '',
            //         password: '',
            //         username: '',
            //         success: true
            //     });
                
            // } else {
            //     console.log(data);
            //     setValues({ ...values, 
            //         error: "Account could not be created.",
            //         success: false
            //     });
            // }
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
                    <label className="text-muted">File</label>
                    <input type="file" className="form-control" onChange={changeHandlerFile('files')} />
                </div>
                <div className="form-group">
                    <select className="form-control" onChange={changeHandlerNotebook('notebook')}>
                        {
                            notebooks.map((v, i) => (
                                <option key={i} value={v._id}>{v.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <select className="form-control" onChange={changeHandler('subject')}>
                        {
                            subjects.map((v, i) => (
                                <option key={i} value={v._id}>{v.title}</option>
                            ))
                        }
                    </select>
                </div>
                <button className="btn btn-primary" onClick={submitOcr}>
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
                Paged scanned.
            </div>
        )
    }

    return (
        <Format 
            title="Upload Files" 
            desc="Upload your handwritten notes to convert them to typed text." 
            className="container-fluid col-md-8 offset-md-2"
        >
            {/* {errorAlert()} */}
            {successAlert()}
            {signForm()}
        </Format>
    );
};
export default OcrUpload;
