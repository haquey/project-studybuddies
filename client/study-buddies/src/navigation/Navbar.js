import React, { Component } from 'react';
import "./Navbar.css";
import { Menu, Icon, Dropdown } from 'semantic-ui-react';

class Navbar extends Component {
    state = {
        activeItem: 'home',
        user: 'Adnan Shahid',
    }

    handleNavClick = (e, clicked) => {
        this.setState({ activeItem: clicked })
    }

    render() {
        const dropDown = (
            <div className="dropDown">
                <div className="userContainer">
                    <Icon className="menuIcon" name='user'/>
                </div>
                <div className="userContainer">
                    <p>{ this.state.user }</p>
                </div>
            </div>
        )

        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <div className="navbar">
                    <Menu className="menu" inverted pointing secondary>
                        <Menu.Item
                            className="menuItem"
                            active = {this.state.activeItem === 'home'}
                            onClick = {(e) => this.handleNavClick(e, 'home')}
                        >
                            <Icon className="menuIcon" name='home'/>
                        </Menu.Item>
                        <Menu.Item
                            className="menuItem"
                            active = {this.state.activeItem === 'upload'}
                            onClick = {(e) => this.handleNavClick(e, 'upload')}
                        >
                            <Icon className="menuIcon" name='upload'/>
                        </Menu.Item>
                        <Menu.Item
                            className="menuItem"
                            active = {this.state.activeItem === 'search'}
                            onClick = {(e) => this.handleNavClick(e, 'search')}
                        >
                            <Icon className="menuIcon" name='search'/>
                        </Menu.Item>
                    </Menu>
                    <div className="userOptions">
                        <Dropdown trigger={dropDown} className="dropDownContainer">
                            <Dropdown.Menu className="dropDownMenu">
                                <Dropdown.Item icon='sign-out' text='Log out'/>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;