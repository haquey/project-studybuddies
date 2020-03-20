import React, { Component } from 'react';
import "./Notebook/Styles.css";
import { Card } from 'semantic-ui-react';
import { Redirect } from 'react-router';

class NotebookSelect extends Component {
    state = {
        redirect: null,
        notebooks: [
            {
                id: "0",
                title: "Adnan's notebook",
                author: 'Adnan Shahid'
            },
            {
                id: "1",
                title: "Yasir's notebook",
                author: 'Yasir Haque'
            },
            {
                id: "3",
                title: "Thierry's notebook",
                author: 'Thierry Sans'
            }
        ]
    }

    onClick = (id) => {
        // go to correct page for notebook id
        this.setState({redirect: '1'})
    }

    render() {
        if (this.state.redirect !== null) {
            return <Redirect push to="/signin" />;
        }

        let subjects = this.state.notebooks.map((notebook, index) => {
            return (
                <Card key={notebook.id} style={{width: "100%"}} onClick={this.onClick}>
                    <Card.Content>
                        <Card.Header content={notebook.title} className={notebook.author}/>
                        <Card.Meta className="notebookAuthor" content={notebook.author} />
                        {/* <Card.Description content='Jake is a drummer living in New York.' /> */}
                    </Card.Content>
                </Card>
            );
        });

        return (
            <div className="notebookSelect">
                <div className="notebookSelectContainer">
                    <Card style={{width: '100%'}}>
                        <Card.Content>
                            <Card.Header content="Select or Add a Notebook!" className="selectHeader"/>
                                {subjects}
                        </Card.Content>
                    </Card>
                </div>
            </div>
        )
    }
}

export default NotebookSelect;