import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup';
import Home from './main/Home';
import NavBar from './main/NavBar';
import NotebookSelect from './main/NotebookSelect';
import Notebook from './main/notebook/Notebook';
import { isAuthenticated } from './auth';
import OcrUpload from './main/OcrUpload';
import Search from './main/Search';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                {isAuthenticated() && (
                    <Fragment>
                        <Route path="/notebookselect" exact component={NotebookSelect}/>
                        <Route path="/notebook" exact component={Notebook}/>
                        <Route path="/upload" exact component={OcrUpload}/>
                        <Route path="/search" exact component={Search}/>
                    </Fragment>
                )}
                
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;