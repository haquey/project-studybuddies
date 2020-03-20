import React, { Component } from 'react';
import "../Styles.css";
import { DragDropContext } from "react-beautiful-dnd";
// import Pages from './Pages'
import PageColumn from './PageColumn'
import SubjectColumn from './SubjectColumn'
import { Header, Icon } from 'semantic-ui-react'

class Sidebar extends Component {
    state = {
        subjects: [
            {
                id: 'sub1',
                title: 'subject 1'
            },
            {
                id: 'sub2',
                title: 'subject 2'
            },
            {
                id: 'sub3',
                title: 'subject 3'
            }
        ],
        pages: [
            {
                id: 'page0',
                subjectId: 'sub1',
                title: 'page 0'
            },
            {
                id: 'page1',
                subjectId: 'sub1',
                title: 'page 1'
            },
            {
                id: 'page2',
                subjectId: 'sub1',
                title: 'page 2'
            },
            {
                id: 'page3',
                subjectId: 'sub3',
                title: 'page 3'
            },
        ]
    };



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
        const movedPage = this.state.pages.find(page => page.id === draggableId);
        pages.splice(destination.index, 0, movedPage);
        
        this.setState({ pages: pages })
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
        const movedSubject = this.state.subjects.find(subject => subject.id === draggableId);
        subjects.splice(destination.index, 0, movedSubject);
        
        this.setState({ subjects: subjects });
    };

    onCreateSubject = () => {
        //TODO
        const newSubject = {
            id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
            title: 'untitled'
        }
        let currSubjects = [...this.state.subjects];
        currSubjects.push(newSubject);
        this.setState({ subjects: currSubjects });
    }

    onCreatePage = () => {
        const newPage = {
            id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
            title: 'untitled'
        }
        let currPages = [...this.state.pages];
        currPages.push(newPage);
        this.setState({ pages: currPages });
    }

    onSelectSubject = (subjectId) => {
        // backend call to get pages for subject id here
        // then set state to correct pages
        if (subjectId === 'sub1') {
            let pages = [
                {
                    id: 'sub1-page0',
                    title: 'sub1 page 0'
                },
                {
                    id: 'sub1-page1',
                    title: 'sub1 page 1'
                }
            ]
            this.setState({pages: pages});
        }
    }

    onRenameSubject = (e, subjectId) => {
        let subjects = [...this.state.subjects];
        subjects.find(subject => subject.id === subjectId).title = e.target.value;
        this.setState({subjects: subjects})
    }

    onSaveSubjectName = (subjectId) => {
        // push to backend here
        console.log("saved subj to backend")
    }

    onRenamePage = (e, pageId) => {
        let pages = [...this.state.pages];
        pages.find(page => page.id === pageId).title = e.target.value;
        this.setState({pages: pages})
    }

    onSavePageName = (pageId) => {
        // push to backend here
        console.log("saved page to backend")
    }

    onDeleteSubject = (subjectId) => {
        console.log('del sub')
        const activePage = this.props.getActivePage();
        // check if this subject was the active subject
        if (activePage.subjectId === subjectId) {
            this.props.setActive(null)
        }

        let subjects = [...this.state.subjects];
        let newSubjects = subjects.filter(subject => subject.id !== subjectId);
        this.setState({subjects: newSubjects})
    }

    onDeletePage = (pageId) => {
        console.log('del page')
        const activePage = this.props.getActivePage();
        // check if this subject was the active subject
        if (activePage.id === pageId) {
            this.props.setActive(null)
        }

        let pages = [...this.state.pages];
        let newPages = pages.filter(page => page.id !== pageId);
        this.setState({pages: newPages})
    }

    render() {
        return (
            <div className="sidebar">
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
