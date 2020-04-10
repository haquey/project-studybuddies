import React, { Component } from 'react';
import "../Styles.css";
import { DragDropContext } from "react-beautiful-dnd";
// import Pages from './Pages'
import PageColumn from './PageColumn';
import SubjectColumn from './SubjectColumn';
import { Header, Icon } from 'semantic-ui-react';
import { API } from "../../../config";

class Sidebar extends Component {
    state = {
        user: JSON.parse(localStorage.getItem('jwt')).user,
        subjects: [],
        activeSubject: null,
        pages: []
    };

    componentDidMount() {
        this._isMounted = true;
        this.getSubjects();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getSubjects = () => {
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/`, {
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
    }

    onPageDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }

        let pages = Array.from(this.state.pages);
        pages.splice(source.index, 1);
        const movedPage = this.state.pages.find(page => page._id === draggableId);
        pages.splice(destination.index, 0, movedPage);
        let i;
        for (i=0; i < pages.length; i++) {
            pages[i].order = i;
        }
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/${this.state.activeSubject}/page/${movedPage._id}/order`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order: movedPage.order})
        })
        .then(
            this.setState({ pages: pages })
        )
        .catch(err => console.log(err));
    };

    onSubjectDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }

        let subjects = Array.from(this.state.subjects);
        subjects.splice(source.index, 1);
        const movedSubject = this.state.subjects.find(subject => subject._id === draggableId);
        subjects.splice(destination.index, 0, movedSubject);
        let i;
        for (i=0; i < subjects.length; i++) {
            subjects[i].order = i;
        }

        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/${movedSubject._id}/order`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order: movedSubject.order})
        })
        .then(
            this.setState({ subjects: subjects })
        )
        .catch(err => console.log(err));

        console.log(this.state.pages)
    };

    onCreateSubject = () => {
        //TODO
        
        const newSubject = {
            notebookId: this.props.notebookId,
            title: 'untitled',
            order: this.state.subjects.length // default last
        }
        
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/create`, {
            method: "POST",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newSubject)
        })
        .then(res => res.json())
        .then(data => {
            let currSubjects = [...this.state.subjects];
            currSubjects.push(data);
            this.setState({ subjects: currSubjects });
        })
        .catch(err => console.log(err));
    }

    onCreatePage = () => {
        const newPage = {
            ownerId: this.state.user._id,
            ownerName: this.state.user.username,
            notebookId: this.props.notebookId,
            subjectId: this.state.activeSubject,
            rawTitle: 'untitled',
            richTitle: 'untitled',
            order: this.state.pages.length // default last
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
        .then(res => res.json())
        .then(data => {
            let currPages = [...this.state.pages];
            currPages.push(data);
            this.setState({ pages: currPages });
        })
        .catch(err => console.log(err));
    }

    onSelectSubject = (subjectId) => {
        // backend call to get pages for subject id here
        // then set state to correct pages
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/${subjectId}/page`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            data.sort((a, b) => a.order - b.order);
            this.setState({pages: data, activeSubject: subjectId})
        })
        .catch(err => console.log(err));
    }

    onRenameSubject = (e, subjectId) => {
        let subjects = [...this.state.subjects];
        subjects.find(subject => subject._id === subjectId).title = e.target.value;
        this.setState({subjects: subjects})
    }

    onSaveSubjectName = (subjectId) => {
        // pushes subject new name to backend on click out of input
        const subjects = [...this.state.subjects];
        const editedSubject = subjects.find(subject => subject._id === subjectId)
        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/${subjectId}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedSubject)
        })
        .catch(err => console.log(err));
    }

    onRenamePage = (e, pageId) => {
        let pages = [...this.state.pages];
        pages.find(page => page._id === pageId).richTitle = e.target.value;
        pages.find(page => page._id === pageId).rawTitle = e.target.value;
        this.setState({pages: pages})
    }

    onSavePageName = (pageId) => {
        // push to backend here
        const pages = [...this.state.pages];
        const editedPage = pages.find(page => page._id === pageId)
        fetch(`${API}/user/${this.state.user._id}/page/${pageId}`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedPage)
        })
        .catch(err => console.log(err));
    }

    onDeleteSubject = (subjectId) => {
        const activePage = this.props.getActivePage();
        // check if this subject was the active subject
        if (activePage !== null) {
            if (activePage.subjectId === subjectId) {
                this.props.setActive(null)
            }
        }

        fetch(`${API}/user/${this.state.user._id}/notebook/${this.props.notebookId}/subject/${subjectId}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            let subjects = [...this.state.subjects];
            let newSubjects = subjects.filter(subject => subject._id !== subjectId);
            this.setState({subjects: newSubjects})
        })
        .catch(err => console.log(err));
    }

    onDeletePage = (pageId) => {
        const activePage = this.props.getActivePage();
        // check if this subject was the active subject
        if (activePage !== null) {
            if (activePage._id === pageId) {
                this.props.setActive(null)
            }
        }

        fetch(`${API}/user/${this.state.user._id}/page/${pageId}`, {
            method: "DELETE",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
        })
        .then(res => res.json())
        .then(data => {
            let pages = [...this.state.pages];
            let newPages = pages.filter(page => page._id !== pageId);
            this.setState({pages: newPages})
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="sidebar compMargin">
                <div className="sidebarHeader">
                    <Header as='h2' inverted color='grey' className="header">My Notebook</Header>
                    <div className="notebookInput">
                        <div className="searchNotebook">
                            <Icon className="searchIcon" name='search' />
                        </div>
                        <div className="addNotebook">+</div>
                    </div>
                </div>
                <div className="sidebarContent">
                    <DragDropContext
                        onDragEnd={this.onSubjectDragEnd}
                    >
                        <SubjectColumn
                            edit={this.onRenameSubject}
                            create={this.onCreateSubject}
                            click={this.onSelectSubject}
                            key={'subjects'} 
                            subjects={this.state.subjects}
                            saveName={this.onSaveSubjectName}
                            delete={this.onDeleteSubject}
                        />
                    </DragDropContext>
                    <div className="divider"></div>
                    <DragDropContext
                        onDragEnd={this.onPageDragEnd}
                    >
                        <PageColumn
                            edit={this.onRenamePage}
                            create={this.onCreatePage}
                            click={this.props.setActive}
                            key={'pages'} 
                            pages={this.state.pages}
                            saveName={this.onSavePageName}
                            delete={this.onDeletePage}
                        />
                    </DragDropContext>
                </div>
            </div>
        );
    }
}

export default Sidebar;
