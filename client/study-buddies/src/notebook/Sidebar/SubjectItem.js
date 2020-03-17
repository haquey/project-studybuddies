import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "../Styles.css";

class SubjectItem extends Component {
    render() {
        return (
            <Draggable draggableId={this.props.subject.id} index={this.props.index}>
                {(provided) => (
                    <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className="subjectItem"
                        onClick={() => {console.log("nib")}}
                    >   
                        <p>
                            {this.props.subject.title}
                        </p>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default SubjectItem;