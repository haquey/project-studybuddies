import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin'
import Signup from './user/Signup';
import Home from './main/Home';
import NavBar from './main/NavBar';

const Routes = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/signin" exact component={Signin}/>
            <Route path="/signup" exact component={Signup}/>
        </Switch>
        </BrowserRouter>
    )
}

export default Routes;