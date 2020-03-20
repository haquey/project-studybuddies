import React, { Component } from 'react';
import "./notebook/Styles.css";
import { Card, Button, Icon, Input } from 'semantic-ui-react';
import { Redirect } from 'react-router';
import { API } from "../config";

class NotebookSelect extends Component {
    state = {
        redirect: null,
        user: JSON.parse(localStorage.getItem('jwt')).user,
        notebooks: [],
        isEditing: null
    }

    componentDidMount() {
        this.getNotebooks()
    }

    getNotebooks = () => {
        fetch(`${API}/user/${this.state.user._id}/notebook/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({notebooks: data})
        })
        .catch(err => console.log(err));
    }

    onAddNotebook = () => {
        let notebook = {
            ownerId: this.state.user._id,
            title: 'untitled',
            collaborators: []
        }
        
        fetch(`${API}/user/${this.state.user._id}/notebook/create`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notebook)
        })
        .then(res => res.json())
        .then(data => {
            let notebooks = [...this.state.notebooks];
            notebooks.push(data);
            this.setState({notebooks: notebooks})
        })
    }

    editName = (id) => {
        this.setState({isEditing: id})
    }

    setName = (notebook) => {
        this.setState({isEditing: null})

        fetch(`${API}/user/${this.state.user._id}/notebook/${notebook._id}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(notebook)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    onClick = (title, id) => {
        // go to correct page for notebook id
        this.getNotebooks()
        // this.setState({redirect: '1'})
    }

    onChangeHandler = (e, index) => {
        let notebooks = [...this.state.notebooks]
        notebooks[index].title = e.target.value;
        this.setState({notebooks: notebooks})
    }

    render() {
        if (this.state.redirect !== null) {
            return <Redirect push to="/notebook" />;
        }

        let subjects = this.state.notebooks.map((notebook, index) => {
            return (
                <Card key={index} style={{width: "100%"}} onClick={this.onClick}>
                    <Card.Content>
                        <Card.Header>
                            {
                                this.state.isEditing === notebook._id ?
                                <Input
                                    value={this.state.notebooks[index].title}
                                    onChange={(e) => this.onChangeHandler(e, index)}
                                    autoFocus
                                    onBlur={() => this.setName(notebook)}
                                />
                            :
                                <div className="selectHeader">
                                    <p style={{margin: 0}}>{notebook.title}</p>
                                    <Button style={{marginLeft: "auto"}} onClick={() => this.editName(notebook._id)}>
                                        <Icon style={{margin: 0}} name='edit'/>
                                    </Button>
                                </div>
                            }
                        </Card.Header>
                        {/* <Card.Meta className="notebookAuthor" content={notebook.author} /> */}
                        {/* <Card.Description content='Jake is a drummer living in New York.' /> */}
                    </Card.Content>
                </Card>
            );
        });

        return (
            <div className="notebookSelect">
                <div className="notebookSelectContainer">
                    <Card style={{width: '100%'}}>
                        <Card.Content>
                            <Card.Header>
                                <div className="selectHeader">
                                    <p style={{margin: 0}}>Add or Select a Notebook!</p>
                                    <Button style={{marginLeft: "auto"}} onClick={this.onAddNotebook}>
                                        <Icon style={{margin: 0}} name='plus'/>
                                    </Button>
                                </div>
                            </Card.Header>
                                {subjects}
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default NotebookSelect;