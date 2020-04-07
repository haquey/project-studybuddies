import React, { Component } from 'react';
import "./Styles.css";
import Page from './Page'
import Sidebar from './Sidebar/Sidebar'
import EmptyPage from './EmptyPage'
import RichTextEditor from 'react-rte';
import { API } from "../../config";


class Notebook extends Component {
    _isMounted = false;

    state = {
        notes: [],
        user: JSON.parse(localStorage.getItem('jwt')).user,
        activePage: null,
        activeSubject: null
    }

    setActivePage = (pageId) => {
        if (pageId !== null) {
            // get the page data and set the state in a call here
            // value it takes in should be get reqest return value
            // appending value to all notes
            // let notes = this.setNotes([{
            //     // style: style,
            //     id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
            //     yPosition: 400,
            //     xPosition: 400,
            //     value: RichTextEditor.createEmptyValue(),
            //     readOnly: false,
            //     text: 'WOWO COOL NOTE'
            // }])
            // let samplePage = {
            //     id: 'page0',
            //     owner: 'Adnan',
            //     subjectId: 'sub1',
            //     notebookId: '000',
            //     collaborators: [],
            //     title: 'A cool note!',
            //     timestamp: 'March 17, 2020',
            //     notes: notes,
            //     tags: []
            // }
            // this.setState({ activePage: samplePage })
            fetch(`${API}/user/${this.state.user._id}/page/${pageId}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({activePage: data}, function () {
                    // console.log(this.state.activePage)
                })
            })
            .catch(err => console.log(err));
        } else {
            this.setState({ activePage: null })
        }
        
    }

    getActivePage = () => {
        return this.state.activePage
    }

    setNotes = (notes) => {
        // creating RTE values from their string representations
        let i;
        for (i=0; i < notes.length; i++) {
            notes[i].value = RichTextEditor.createValueFromString(notes[i].text, 'html')
        }
        return notes;
    }

    render() {
        return (
            <div style={ {display: 'flex'} }>
                <Sidebar notebookId={this.props.location.state.id} setActive={this.setActivePage} getActivePage={this.getActivePage}/>
                {
                    this.state.activePage != null ?
                        <Page page={this.state.activePage} key={this.state.activePage._id}/>
                    : <EmptyPage/>
                }
            </div>
        );
    }
}

export default Notebook;
