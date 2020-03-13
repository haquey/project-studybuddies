import React, { Component } from 'react';
import RichTextEditor from 'react-rte';


const useStyles = {
    pageLayout: {
        height: '100vh'
    },
    editorSize: {
        maxWidth: '95vw',
        width: 'fit-content',
        position: 'absolute',
        top: '300px'
    },
    editorSizee: {
        maxWidth: '95vw',
        width: 'fit-content',
        position: 'absolute',
        // left: '600px'
        top: '300px'
    }
}

class Page extends Component {
    // static propTypes = {
    //     onChange: PropTypes.func
    // };

    state = {
        value: RichTextEditor.createEmptyValue(),
        value2: RichTextEditor.createEmptyValue(),
        notes: [],
        readOnly: false
    }

    onChangeHandler = (value, index) => {
        let notes = [...this.state.notes]
        notes[index].value = value;
        this.setState( {notes: notes} )
    };

    onChange = (value) => {
        this.setState({value: value})
    }

    writeNote = (e) => {
        // console.log(e.clientY - e.target.offsetTop) used if we want positions relative to element
        // console.log(e.clientX - e.target.offsetLeft)
        let style = {
            maxWidth: '95vw',
            width: 'fit-content',
            position: 'absolute',
            top: e.clientY,
            left: e.clientX
        }
        let note = {
            style: style,
            value: RichTextEditor.createEmptyValue(),
            readOnly: false
        }

        let notes = [...this.state.notes]

        let i;
        
        // TODO just keep track of the active one to not change every single value
        // make all other notes read only
        for (i = 0; i < notes.length; i++) {
            notes[i].readOnly = true
        }

        notes.push(note)

        this.setState( {notes: notes} )
    }
    
    editNote = (e, index) => {
        e.stopPropagation();
        let notes = [...this.state.notes];

        // make all other notes read only
        let i;
        for (i = 0; i < notes.length; i++) {
            notes[i].readOnly = true
        }

        notes[index].readOnly = false;

        this.setState( {notes: notes} )

    }
    // onClick={(e) => this.handleFoop(e)}

    render() {
        const styles = useStyles;

        return (
            <div style={styles.pageLayout} onClick={(e) => this.writeNote(e)}>
                {/* <div style={styles.editorSize}>
                    <RichTextEditor
                        readOnly={this.state.readonly}
                        value={this.state.value}
                        onChange={this.onChange}
                    />
                </div> */}
                {this.state.notes.map((item, index) => {
                    return (
                        <div style={this.state.notes[index].style} onClick={(e) => this.editNote(e, index)} key={index}>
                            <RichTextEditor
                                value={this.state.notes[index].value}
                                index={index}
                                readOnly={this.state.notes[index].readOnly}
                                onChange={(e) => this.onChangeHandler(e, index)}
                                autoFocus={true}
                            />
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Page;
