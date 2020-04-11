import React, { Component } from 'react';
import "./notebook/Styles.css";
import "./externalStyles.css";
import Tags from './Tags';
import { Card, Button, Icon, Input, Tab, Modal, Header, Dropdown, Form } from 'semantic-ui-react';
import { API } from "../config";


class Search extends Component {

    state = {
        user: JSON.parse(localStorage.getItem('jwt')).user,
        searchValue: '',
        storedSearch: '',
        pages: [],
        addingPage: false,
        addedPageTitle: '',
        notebooks: [],
        noteBookDropdown: [],
        selectedNotebook: null,
        selectedSubject: null,
        selectedPage: {},
        subjects: null,
        searched: false,
        pageNum: 0,
        nextResults: [],
    }

    componentDidMount() {
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

    setAddedPage = (page) => {
        this.setState({addingPage: true, selectedPage: page, addedPageTitle: page.rawTitle})
    }

    handleClose = () => {
        this.setState({addingPage: false, selectedPage: {}, selectedNotebook: null, selectedSubject: null})
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
        // get pages of selected subject
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.state.selectedNotebook}/subject/${this.state.selectedSubject}/page`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            const newPage = {
                ownerId: this.state.user._id,
                ownerName: this.state.user.username,
                notebookId: this.state.selectedNotebook,
                subjectId: this.state.selectedSubject,
                rawTitle: this.state.addedPageTitle,
                richTitle: this.state.addedPageTitle,
                notes: this.state.selectedPage.notes,
                order: data.length // default last
            }

            fetch(`${API}/user/${this.state.user._id}/page/create`, {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newPage)
            })
            .then(
                this.handleClose()
            )
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
        // err checking
        // console.log(this.state.notebooks.find(notebook => notebook._id === this.state.selectedNotebook));
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
                this.setState({subjects: data, x: true})
            })
            .catch(err => console.log(err));
        })
    }

    selectSubject = (e, { value }) => {
        this.setState({selectedSubject: value})
    }

    searchPages = () => {
        let searchVal = encodeURIComponent(this.state.searchValue.trim())
        this.search(searchVal)
    }

    search = (searchVal) => {
        this.setState({storedSearch: searchVal}, function() {
            fetch(`${API}/user/${this.state.user._id}/search/page?key=${this.state.storedSearch}&&page=${this.state.pageNum}`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                    "Content-Type": "application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                this.setState({searched: true, pages: data}, function () {
                    fetch(`${API}/user/${this.state.user._id}/search/page?key=${this.state.storedSearch}&&page=${(this.state.pageNum + 1)}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                            "Content-Type": "application/json"
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.setState({nextResults: data.length})
                    })
                })
            })
            .catch(err => console.log(err));
        })
    }

    // enter press on input search
    onKeyPress = (e) => {
        if (e.keyCode == 13){
            this.searchPages()
        }
    }

    nextPage = (direction) => {
        if (direction) {
            this.setState({pageNum: (this.state.pageNum + 1)}, function () {
                this.search(this.state.storedSearch)
            })
        } else {
            this.setState({pageNum: (this.state.pageNum - 1)}, function () {
                this.search(this.state.storedSearch)
            })
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            addedPageTitle: e.target.value
        });
    }

    // handleChange = (e, { value }) => this.setState({ value })

    render() {
        let pages = this.state.pages.map((page, index) => {
            return (
                <Card key={index} className="addPageDisplay">
                    <Card.Content className="pageCard">
                        <Card.Header>
                            <div className="long">
                                {page.rawTitle}
                            </div>
                        </Card.Header>
                        <Card.Meta className="notebookAuthor" content={page.ownerName} />
                        <Card.Description style={{marginLeft: "1vw"}}>
                            <Tags key={page._id} tags={page.tags}/>
                        </Card.Description>
                    </Card.Content>
                    <div>
                        <Button className="noMargin" onClick={() => this.setAddedPage(page)}>
                            <Icon className="noMargin" name='cloud upload'/>
                        </Button>
                    </div> 
                </Card>
            );
        });

        return (
            <div>
                <div className="notebookSelect">
                    <div className="notebookSelectContainer">
                        <div style={{display: 'flex'}}>
                            <Input 
                                onKeyDown={this.onKeyPress}
                                size='massive' className="publicSearch"
                                placeholder='Search public pages...'
                                value={this.state.searchValue}
                                onChange={this.onChangeHandler}
                            />
                            <Button type="submit" className="noMargin" onClick={this.searchPages}>
                                <Icon className="noMargin" name='search'/>
                            </Button>
                        </div>
                        {
                            this.state.searched ?
                                <Card style={{width: '100%'}}>
                                    {
                                        this.state.pages.length === 0 ?
                                            <Card className="noSearch">
                                                <Card.Content className="center column">
                                                    <Card.Header className="center column">
                                                        <div>No Results Found</div>
                                                        <div>Please Try Another Search</div>
                                                    </Card.Header>
                                                </Card.Content>
                                            </Card>
                                        :
                                            <Card.Content>
                                                {pages}
                                                <div className="center">
                                                    {
                                                        this.state.pageNum !== 0 ?
                                                            <div onClick={() => this.nextPage(false)} className="arrowMargin pageNav">
                                                                <Icon name="chevron left"/>
                                                            </div>
                                                        : null
                                                    }
                                                    {
                                                        this.state.nextResults !== 0 ?
                                                            <div onClick={() => this.nextPage(true)} className="pageNav">
                                                                <Icon name="chevron right"/>
                                                            </div>
                                                        : null
                                                    }
                                                    
                                                </div>
                                            </Card.Content>
                                    }
                                </Card>
                            :   
                                <Card className="noSearch">
                                    <Card.Content className="center column">
                                        <Card.Header className="center column">
                                            <div>Nothing's been searched yet!</div>
                                            <div>Use the search above</div>
                                        </Card.Header>
                                    </Card.Content>
                                </Card>
                        }
                        
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
                            {
                                this.state.subjects === null ?
                                    null
                                :
                                    this.state.subjects.length === 0 ?
                                        <div className="addedTitle">
                                            <p>
                                                There are no subjects in this notebook, please choose another
                                            </p>
                                        </div>
                                    : 
                                        <div className="addedTitle">
                                            <p>
                                                Choose the Subject you want to add this page to
                                            </p>
                                            <div>
                                                <Form.Dropdown
                                                    className="notebookDropdown"
                                                    fluid
                                                    search
                                                    required
                                                    selection
                                                    options={this.state.subjects.map(subject => {
                                                        return {
                                                            key: subject._id,
                                                            text: subject.title,
                                                            value: subject._id
                                                        }
                                                    })}
                                                    value={this.state.selectedSubject}
                                                    placeholder='Select Subject'
                                                    onChange={this.selectSubject}
                                                />
                                            </div>
                                        </div>
                            }
                            <div className="addedTitle">
                                <p>
                                    Update or keep the current page title
                                </p>
                                <Input 
                                    className="addPageContainers" 
                                    placeholder={this.state.selectedPage.rawTitle}
                                    value={this.state.addedPageTitle}
                                    onChange={this.nameChangeHandler}
                                />
                            </div>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button disabled={this.state.selectedSubject === null || this.state.selectedSubject.length === 0} onClick={this.onAddPage} color='green'>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default Search;