import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import "./Styles.css";
import { API } from "../../config";

// import Draggable from 'react-draggable'; // The default

var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();



class Page extends Component {
    _isMounted = false;

    state = {
        _id: this.props.page._id,
        user: JSON.parse(localStorage.getItem('jwt')).user,
        notes: [],
        readOnly: null,
        titleReadOnly: false,
        date: (month + " " +  day + ", " + year),
        richTitle: RichTextEditor.createValueFromString(this.props.page.richTitle, 'html'),
        rawTitle: this.props.page.rawTitle,
        init: true
    }

    componentDidMount() {
        this._isMounted = true;
        let notes = [...this.props.page.notes]
        let i;
        for (i=0; i < notes.length; i++) {
            notes[i].value = RichTextEditor.createValueFromString(notes[i].richText, 'html')
        }
        // setting all notes to read only on init
        this.setState({notes: notes}, function () {
            for (i = 0; i < notes.length; i++) {
                notes[i].readOnly = true;
            }
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // componentDidUpdate(prevProps) {
    //     console.log("update with did update")
    // }

    onChangeHandler = (value, index) => {
        let notes = [...this.state.notes];
        notes[index].value = value
        // // move this statement to when we decide to push
        // console.log(value.toString('markdown'));
        notes[index].richText = value.toString('html')
        let wrapper = document.createElement('div');
        wrapper.innerHTML = notes[index].richText.trim();
        notes[index].rawText = wrapper.innerText;

        this.setState( {notes: notes} );
    };

    onChange = (value) => {
        this.setState({richTitle: value});
        // push title (convert to text) to text here
    }


    writeNote = (e) => {
        // console.log(e.clientY - e.target.offsetTop) used if we want positions relative to element

        this.saveNote()
        let note = {
            yPosition: e.clientY,
            xPosition: e.clientX,
            value: RichTextEditor.createValueFromString('', 'html'),
            richText: RichTextEditor.createValueFromString('', 'html').toString('html'),
            rawText: RichTextEditor.createValueFromString('', 'html').toString('html'),
            readOnly: false
        }

        let notes = [...this.state.notes];

        let i;

        // TODO just keep track of the active one to not change every single value
        // make all other notes read only
        for (i = 0; i < notes.length; i++) {
            notes[i].readOnly = true;
        }

        // remove any empty string notes
        notes = notes.filter(e => e.rawText !== "");
        notes.push(note);
        this.setState( {notes: notes} )
    }

    saveTitle = () => {
        let richTitle = this.state.richTitle.toString('html');
        // converting html string to raw string
        let wrapper= document.createElement('div');
        wrapper.innerHTML = richTitle.trim();
        let rawTitle = wrapper.innerText;

        // save and send updated title for both formats
        this.setState({rawTitle: rawTitle}, function () {
            let value = {
                richTitle: this.state.richTitle.toString('html'),
                rawTitle: this.state.rawTitle
            }
            fetch(`${API}/user/${this.state.user._id}/page/${this.state._id}/`, {
                method: "PATCH",
                headers: {
                    Accept: 'application/json',
                    'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            })
            .catch(err => console.log(err));
        })
    }

    saveNote = () => {
        let notes = this.state.notes.filter(e => e.value.toString('markdown') !== RichTextEditor.createValueFromString('', 'html').toString('markdown'));
        let noteObj = {
            notes: notes
        }
        
        fetch(`${API}/user/${this.state.user._id}/page/${this.state._id}/`, {
            method: "PATCH",
            headers: {
                Accept: 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('jwt')).token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteObj)
        })
        .then(res => res.json())
        .then(() => {
            this.setState({titleReadOnly: true})
        })
        .catch(err => console.log(err));
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

    check = (e) => {
        e.stopPropagation();
    }

    render() {
        // const dragHandlers = {onDragStop: this.onStop};
        return (
            <div className="page">
                <div className="pageContainer" id="container" onClick={(e) => this.writeNote(e)}>
                    <div>
                        <div className="pageTitle" onClick={(e) => this.editTitle(e)}>
                            <RichTextEditor
                                className="titleContent"
                                placeholder='Title...'
                                readOnly={this.state.titleReadOnly}
                                value={this.state.richTitle}
                                onChange={this.onChange}
                                autoFocus={true}
                                onBlur={this.saveTitle}
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
                            <div 
                                style = {{
                                    maxWidth: '95vw',
                                    width: 'fit-content',
                                    overflow: 'wrap',
                                    position: 'absolute',
                                    top: item.yPosition,
                                    left: item.xPosition,
                                }}
                                onClick={(e) => this.editNote(e, index)} key={index}
                            >
                                <RichTextEditor
                                    className="notes"
                                    value = {item.value}
                                    index={index}
                                    readOnly={item.readOnly}
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
