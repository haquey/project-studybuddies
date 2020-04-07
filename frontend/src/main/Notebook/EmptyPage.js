import React from 'react';
import "./Styles.css";
import { Card } from 'semantic-ui-react'


let emptyPage = () => {
    return (
        <div className="emptyPage">
            <div className="emptyPageContent">
                <Card style={{width: '100%'}}>
                    <Card.Content header='Select a Subject' />
                    <Card.Content description={'You can add a new subject by clicking the + Subject button on the bottom left!'} />
                </Card>
            </div>
            
        </div>
        
    );
};

export default emptyPage;