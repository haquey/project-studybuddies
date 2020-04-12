import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';
import "./externalStyles.css";

class Tags extends Component {
    _isMounted = false;

    state = {
        tags: []
    }

    componentDidMount() {
        this.formatTags();
    }

    formatTags = () => {
        let tags = [];
        let i;
        for (i = 0; i < this.props.tags.length; i++) {
            let tagList = this.props.tags[i].split('/')
            tagList = tagList.filter(tag => tag != '');
            tags = tags.concat(tagList)
        }
        this.setState({tags: tags})
    }

    render() {
        let tagList = this.state.tags.map((tag, index) => {
            return (
                <Label key={index} as='a'>{tag}</Label>
            );
        });

        return (
            <div className="tagList">
                <Label.Group tag>
                    {tagList}
                </Label.Group>
            </div>
        );
    }
}

export default Tags;
