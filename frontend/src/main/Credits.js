import React, { Component } from 'react';
import "./externalStyles.css";
import { Card, Header } from 'semantic-ui-react';



class Credits extends Component {
    render() {
        const items = [
            {
                header: 'https://cloud.google.com/vision/docs/ocr',
                description: "Converting images to notes was done with the image recognition of Google OCR's NLP, https://cloud.google.com/natural-language/docs/basics",
            },
            {
                header: 'https://www.udemy.com/course/react-node-ecommerce/',
                description: 'Learning Mongoose and deployment could not have been done without this course',
            },
            {
                header: 'https://www.udemy.com/course/react-the-complete-guide-incl-redux/',
                description: 'React was learned and applied with the great help of this course',
            },
            {
                header: 'https://react.semantic-ui.com/',
                description: 'Semantic UI was used as the main CSS library to provide consistent styling',
            },
            {
                header: 'https://github.com/sstur/react-rte',
                description: 'Text editing could not have been done without this API',
            },
            {
                header: 'https://github.com/atlassian/react-beautiful-dnd',
                description: 'Drag and drop features were made using this',
            },
            {
                header: 'https://github.com/vkbansal/react-contextmenu',
                description: 'Was used to make our right click menu',
            },
        ]

        return (
            <div className="creditContainer">
                <Header as='h2' color='black'>Credits</Header>
                {/* <Card.Group className="creditContainer" items={items} /> */}
                <Card.Group>
                    <Card 
                        fluid
                        header='https://cloud.google.com/vision/docs/ocr'
                        description="Converting images to notes was done with the image recognition of Google OCR's NLP, https://cloud.google.com/natural-language/docs/basics"
                    />
                    <Card 
                        fluid
                        header='https://www.udemy.com/course/react-node-ecommerce/'
                        description='Learning Mongoose and deployment could not have been done without this course'
                    />
                    <Card 
                        fluid
                        header='https://www.udemy.com/course/react-the-complete-guide-incl-redux/'
                        description='React was learned and applied with the great help of this course'
                    />
                    <Card 
                        fluid
                        header='https://react.semantic-ui.com/'
                        description='Semantic UI was used as the main CSS library to provide consistent styling'
                    />
                    <Card 
                        fluid
                        header='https://github.com/sstur/react-rte'
                        description='Text editing could not have been done without this API'
                    />
                    <Card 
                        fluid
                        header='https://github.com/atlassian/react-beautiful-dnd'
                        description='Drag and drop features were made using this'
                    />
                    <Card 
                        fluid
                        header='https://github.com/vkbansal/react-contextmenu'
                        description='Was used to make our right click menu'
                    />
                </Card.Group>
            </div>
        );
    }
}
export default Credits;
