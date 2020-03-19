import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "../Styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class SubjectItem extends Component {
    state = {
        isEditing: '-1',
        isFocused: '-1'
    }

    onClickEdit = (id) => {
        this.setState({isEditing: id})
    }

    setName = (id) => {
        this.setState({isEditing: '-1'})
        this.setState({isFocused: '-1'})
        this.props.saveName(id);
    }

    render() {
        return (
            <Draggable draggableId={this.props.subject.id} index={this.props.index}>
                {(provided) => (
                    <div>
                        <ContextMenuTrigger id={this.props.subject.id}>
                            <div>
                                {
                                    this.state.isEditing === this.props.subject.id ?
                                        <input
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="subjectEditItem"
                                            readOnly={this.state.isEditing !== this.props.subject.id}
                                            value={this.props.subject.title}
                                            onChange={(e) => this.props.edit(e, this.props.subject.id)}
                                            autoFocus
                                            onBlur={() => this.setName(this.props.subject.id)}
                                        />
                                    : 
                                        <div
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="subjectItem"
                                            onClick={() => this.props.click(this.props.subject.id)}
                                        >
                                            {this.props.subject.title}
                                        </div>
                                }
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenu id={this.props.subject.id} className="contextMenu">
                            <MenuItem className="contextMenuItem" onClick={() => this.onClickEdit(this.props.subject.id)}>
                                Rename
                            </MenuItem>
                            <MenuItem className="contextMenuItem" onClick={() => this.props.delete(this.props.subject.id)}>
                                Delete Subject
                            </MenuItem>
                            {/* <MenuItem divider /> */}
                            {/* <MenuItem className="lastContextMenuItem" style={ {borderBottom: 'none'} }data={{foo: 'bar'}}>
                                Add New Subject
                            </MenuItem> */}
                        </ContextMenu>
                    </div>
                )}
            </Draggable>
        )
    }
}

export default SubjectItem;