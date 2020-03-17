import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import "./Styles.css";




const useStyles = {
    pageLayout: {
        height: '100vh'
    },
    temp: {
        width: '45vh',
        marginRight: 'none'
    }
}

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();

class Page extends Component {
    state = {
        notes: [],
        readOnly: false,
        titleReadOnly: false,
        date: (month + " " +  day + ", " + year),
        value: RichTextEditor.createEmptyValue()
    }

    onChangeHandler = (value, index) => {
        let notes = [...this.state.notes];
        notes[index].value = value;
        this.setState( {notes: notes} );
    };

    onChange = (value) => {
        this.setState({value: value});
    }

    writeNote = (e) => {
        // console.log(e.clientY - e.target.offsetTop) used if we want positions relative to element
        // console.log(e.clientX - e.target.offsetLeft)
        let style = {
            maxWidth: '95vw',
            width: 'fit-content',
            overflow: 'wrap',
            position: 'absolute',
            top: e.clientY,
            left: e.clientX
        }
        let note = {
            style: style,
            value: RichTextEditor.createEmptyValue(),
            readOnly: false
        }

        let notes = [...this.state.notes];

        let i;

        // TODO just keep track of the active one to not change every single value
        // make all other notes read only
        for (i = 0; i < notes.length; i++) {
            notes[i].readOnly = true;
        }

        this.setState({titleReadOnly: true})

        // remove any empty string notes
        notes = notes.filter(e => e.value.toString('markdown') !== RichTextEditor.createValueFromString('', 'html').toString('markdown'));

        notes.push(note);

        this.setState( {notes: notes} );
    }
    
    editNote = (e, index) => {
        e.stopPropagation();
        let notes = [...this.state.notes];

        // make all other notes read only
        let i;
        for (i = 0; i < notes.length; i++) {
            notes[i].readOnly = true;
        }

        this.setState({titleReadOnly: true})

        notes[index].readOnly = false;

        this.setState( {notes: notes} )

    }

    editTitle = (e) => {
        e.stopPropagation();
        this.setState( {titleReadOnly: false} )
    }

    render() {
        const styles = useStyles;

        return (
            <div className="page">
                <div style={styles.pageLayout} onClick={(e) => this.writeNote(e)}>
                    {/* <div style={styles.editorSize}>
                        <RichTextEditor
                            readOnly={this.state.readonly}
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </div> */}
                    <div>
                        <div className="pageTitle" onClick={(e) => this.editTitle(e)}>
                            <RichTextEditor
                                className="titleContent"
                                placeholder='Title...'
                                readOnly={this.state.titleReadOnly}
                                value={this.state.value}
                                onChange={this.onChange}
                                autoFocus={true}
                            />
                        </div>
                        <div>
                            <div className="ui label date">
                                {this.state.date}
                            </div>
                        </div>
                    </div>
                    {this.state.notes.map((item, index) => {
                        return (
                            <div style={this.state.notes[index].style} onClick={(e) => this.editNote(e, index)} key={index}>
                                <RichTextEditor
                                    className="notes"
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
            </div>
        );
    }
}

export default Page;
