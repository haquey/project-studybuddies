import React, { Component } from 'react';
import "./Styles.css";
import Page from './Page.js'
import Sidebar from './Sidebar/Sidebar.js'

class Notebook extends Component {
    state = {
        notes: []
    }

    render() {

        return (
            <div style={ {display: 'flex'} }>
                <Sidebar/>
                <Page/>
            </div>
        );
    }
}

export default Notebook;
