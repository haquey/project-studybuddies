import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup';
import Home from './main/Home';
import NavBar from './main/NavBar';
import NotebookSelect from './main/NotebookSelect';
import Notebook from './main/notebook/Notebook';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/signin" exact component={Signin}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/notebookselect" exact component={NotebookSelect}/>
                <Route path="/notebook" exact component={Notebook}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;