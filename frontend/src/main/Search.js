import React, { Component } from 'react';
import "./notebook/Styles.css";
import { Card, Button, Icon, Input, Tab, Modal, Header, Dropdown, Form } from 'semantic-ui-react';
import { API } from "../config";


class Search extends Component {

    state = {
        user: JSON.parse(localStorage.getItem('jwt')).user,
        searchValue: '',
        pages: [],
        addingPage: false,
        addedPageTitle: '',
        notebooks: [],
        noteBookDropdown: [],
        selectedNotebook: null,
        selectedSubject: null,
        selectedPage: {},
        searchQuery: null
    }

    componentDidMount() {
        this.getPages();
        this.getNotebooks();
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
            let i;
            let dropdown = [];
            for (i=0; i < data.length; i++) {
                dropdown.push({key: data[i]._id, text: data[i].title, value: data[i]._id})
            }
            this.setState({notebooks: data, noteBookDropdown: dropdown})
        })
        .catch(err => console.log(err));
    }

    getPages = () => {
        fetch(`${API}/user/${this.state.user._id}/page`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({pages: data})
        })
        .catch(err => console.log(err));
    }

    setAddedPage = (page) => {
        this.setState({addingPage: true, selectedPage: page, addedPageTitle: page.rawTitle})
    }

    handleClose = () => {
        this.setState({addingPage: false, selectedPage: {}, selectedNotebook: null})
    }

    editName = (e, id) => {
        e.stopPropagation();
        this.setState({isEditing: id})
    }

    onChangeHandler = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    onAddPage = () => {
        // console.log(this.state.selectedNotebook)
        console.log(this.state.notebooks.find(notebook => notebook._id === this.state.selectedNotebook));
        // const newPage = {
        //     ownerId: this.state.user._id,
        //     notebookId: this.state.selectedNotebook,
        //     subjectId: this.state.activeSubject,
        //     rawTitle: 'untitled',
        //     richTitle: 'untitled',
        //     order: this.state.pages.length // default last
        // }

        // fetch(`${API}/user/${this.state.user._id}/page/create`, {
        //     method: "POST",
        //     headers: {
        //         Accept: 'application/json',
        //         'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify(newPage)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     let currPages = [...this.state.pages];
        //     currPages.push(data);
        //     this.setState({ pages: currPages });
        // })
        // .catch(err => console.log(err));
    }

    selectNotebook = (e, { value }) => {
        // get all associated subjects for the selected notebook
        this.setState({selectedNotebook: value}, function () {
            fetch(`${API}/user/${this.state.user._id}/notebook/${this.state.selectedNotebook}/subject/`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                data.sort((a, b) => a.order - b.order);
                this.setState({subjects: data})
            })
            .catch(err => console.log(err));
        })
    }

    // handleChange = (e, { value }) => this.setState({ value })

    render() {
        let pages = this.state.pages.map((page, index) => {
            return (
                <Card key={index} className="addPageDisplay">
                    <Card.Content>
                        <Card.Header>
                            {page.rawTitle}
                        </Card.Header>
                        <Card.Meta className="notebookAuthor" content={"Adnan Shahid"} />
                        <Card.Description style={{marginLeft: "1vw"}} content={"There should be tags here"} />
                    </Card.Content>
                    <div>
                        <Button className="noMargin" onClick={() => this.setAddedPage(page)}>
                            <Icon className="noMargin" name='cloud upload'/>
                        </Button>
                    </div> 
                </Card>
            );
        });

        let panes = [
            {
              menuItem: 'Results by Tag',
              render: () => <Tab.Pane loading={false}>{pages}</Tab.Pane>,
            },
            {
                menuItem: 'Results by Content',
                render: () => <Tab.Pane loading={false}>{pages}</Tab.Pane>,
            }
        ]

        return (
            <div>
                <div className="notebookSelect">
                    <div className="notebookSelectContainer">
                        <div style={{display: 'flex'}}>
                            <Input size='massive' className="publicSearch" placeholder='Search public pages...' value={this.state.searchValue} onChange={this.onChangeHandler}/>
                            <Button className="noMargin" onClick={() => console.log(this.state.searchValue)}>
                                <Icon className="noMargin" name='search'/>
                            </Button>
                        </div>
                        <Card style={{width: '100%'}}>
                            <Card.Content>
                                <Tab panes={panes} />
                            </Card.Content>
                        </Card>
                    </div>
                </div>
                <Modal className="addPageModal" open={this.state.addingPage} onClose={this.handleClose} closeIcon>
                    <Header className="noMargin" icon='cloud upload' content='Add a page to your Notebook' />
                    <Modal.Content>
                        <div className="addPageContainers">
                            <div>
                                <p>
                                    Choose the Notebook you want to add this page to
                                </p>
                                <div>
                                    <Form.Dropdown
                                        className="notebookDropdown"
                                        fluid
                                        search
                                        required
                                        selection
                                        options={this.state.noteBookDropdown}
                                        value={this.state.selectedNotebook}
                                        placeholder='Select Notebook'
                                        onChange={this.selectNotebook}
                                    />
                                </div>
                            </div>
                            <div className="addedTitle">
                                <p>
                                    Update or keep the current page title
                                </p>
                                <Input className="addPageContainers" placeholder={this.state.selectedPage.rawTitle}/>
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={this.state.selectedNotebook === null} onClick={this.onAddPage} color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Search;