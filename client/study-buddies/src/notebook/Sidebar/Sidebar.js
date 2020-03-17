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
                title: 'page 0'
            },
            {
                id: 'page1',
                title: 'page 1'
            },
            {
                id: 'page2',
                title: 'page 2'
            },
            {
                id: 'page3',
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
        
        this.setState({ subjects: subjects })
    };

    onCreateSubject = () => {
        //TODO
        const newSubject = {
            id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
            title: 'untitled'
        }
        let currSubjects = [...this.state.subjects]
        currSubjects.push(newSubject)
        this.setState({ subjects: currSubjects })
    }

    onCreatePage = () => {
        const newPage = {
            id: Math.random().toString(36).replace(/[^a-z]+/g, ''),
            title: 'untitled'
        }
        let currPages = [...this.state.pages]
        currPages.push(newPage)
        this.setState({ pages: currPages })
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
                            create={this.onCreateSubject}
                            key={'subjects'} 
                            subjects={this.state.subjects}
                        />
                    </DragDropContext>
                    <div className="divider"></div>
                    <DragDropContext
                        onDragEnd={this.onPageDragEnd}
                    >
                        <PageColumn
                            create={this.onCreatePage}
                            key={'pages'} 
                            pages={this.state.pages}
                        />
                    </DragDropContext>
                </div>
            </div>
            

        );
    }
}

export default Sidebar;
