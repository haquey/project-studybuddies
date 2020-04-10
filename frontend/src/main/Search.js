import React, { Component } from 'react';
import "./notebook/Styles.css";
import { Card, Button, Icon, Input, Tab, Modal, Header, Dropdown } from 'semantic-ui-react';
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
        selectedPage: {}
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
                dropdown.push({key: data[i]._id, text: data[i].title, value: data[i].title})
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

    onAddPage = (page) => {
        this.setState({addingPage: true, selectedPage: page, addedPageTitle: page.rawTitle})
    }

    handleClose = () => {
        this.setState({addingPage: false, selectedPage: {}})
    }

    editName = (e, id) => {
        e.stopPropagation();
        this.setState({isEditing: id})
    }

    setName = (notebook) => {
        console.log("asd")
    }

    onClick = (id) => {
        this.setState({redirect: id})
    }

    onChangeHandler = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    render() {
        let pages = this.state.pages.map((page, index) => {
            return (
                <Card key={index} className="addPageDisplay" onClick={() => this.onAddPage(page)}>
                    <Card.Content>
                        <Card.Header>
                            {page.rawTitle}
                        </Card.Header>
                        <Card.Meta className="notebookAuthor" content={"Adnan Shahid"} />
                        <Card.Description style={{marginLeft: "1vw"}} content={"There should be tags here"} />
                    </Card.Content>
                    <div>
                        <Button className="noMargin" onClick={() => console.log(this.state.searchValue)}>
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
                                    <Dropdown
                                        className="notebookDropdown"
                                        placeholder='Select Notebook'
                                        fluid
                                        search
                                        selection
                                        options={this.state.noteBookDropdown}
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
                        <Button>
                            Cancel
                        </Button>
                        <Button color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Search;