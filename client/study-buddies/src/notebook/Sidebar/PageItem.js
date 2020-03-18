import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "../Styles.css";

class PageItem extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.page.id} index={this.props.index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="pageItem"
                        onClick={() => this.props.click(this.props.page.id)}
                    >   
                        <p>
                            {this.props.page.title}
                        </p>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default PageItem;