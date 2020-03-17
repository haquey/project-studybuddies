import React, { Component } from 'react';
import "../Styles.css";
import PageItem from './PageItem'
import { Droppable } from "react-beautiful-dnd";
import { Button } from 'semantic-ui-react';

class PageColumn extends Component {
    render() {
        return (
            <div className="pageColumn">
                <Droppable droppableId={'pages'}>
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="itemContainer"
                        >
                            {this.props.pages.map((page, index) => <PageItem key={page.id} page={page} index={index}/>)}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                <div className="addSubject">
                    <Button onClick={this.props.create} className="add">+ Add Page</Button>
                </div>
            </div>
        )
    }
}

export default PageColumn;
