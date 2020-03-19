import React, { Component } from 'react';
import { Draggable } from "react-beautiful-dnd";
import "../Styles.css";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";


class PageItem extends Component {

    state = {
        isEditing: '-1',
    }

    onClickEdit = (id) => {
        this.setState({isEditing: id})
    }

    setName = (id) => {
        this.setState({isEditing: '-1'})
        this.props.saveName(id);
    }

    render() {
        return (
            <Draggable draggableId={this.props.page.id} index={this.props.index}>
                {(provided) => (
                    <div>
                        <ContextMenuTrigger id={this.props.page.id}>
                            <div>
                                {
                                    this.state.isEditing === this.props.page.id ?
                                        <input
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="pageEditItem"
                                            readOnly={this.state.isEditing !== this.props.page.id}
                                            value={this.props.page.title}
                                            onChange={(e) => this.props.edit(e, this.props.page.id)}
                                            autoFocus
                                            onBlur={() => this.setName(this.props.page.id)}
                                        />
                                    :
                                        <div
                                            className="pageItem"
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            onClick={() => this.props.click(this.props.page.id)}
                                        >
                                            {this.props.page.title}
                                        </div>
                                }
                            </div>
                        </ContextMenuTrigger>
                        <ContextMenu id={this.props.page.id} className="contextMenu">
                            <MenuItem className="contextMenuItem" onClick={() => this.onClickEdit(this.props.page.id)}>
                                Rename
                            </MenuItem>
                            <MenuItem className="contextMenuItem" onClick={() => this.props.delete(this.props.page.id)}>
                                Delete Page
                            </MenuItem>
                            {/* <MenuItem divider /> */}
                            {/* <MenuItem className="lastContextMenuItem" style={ {borderBottom: 'none'} }data={{foo: 'bar'}}>
                                Add New Page
                            </MenuItem> */}
                        </ContextMenu>
                    </div>
                    
                )}
            </Draggable>
        )
    }
}

export default PageItem;