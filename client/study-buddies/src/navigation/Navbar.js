import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import PublishIcon from '@material-ui/icons/Publish';
import SearchIcon from '@material-ui/icons/Search';
import { TextField, InputAdornment, Box, Tab, Tabs, Typography, Toolbar, AppBar, IconButton } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    user: {
        ml: 'auto'
    },
    fontColor: {
        color: 'white',
    }
}));

class Navbar extends Component {
    state = {
      value: 0
    }

    tabChangeHandler = (event, newValue) => {
        this.setState({value: newValue});
    };
    
    render() {
        const classes = useStyles;
        return (
            <div>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <Tabs
                            value={this.state.value}
                            onChange={this.tabChangeHandler}
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="inherit"
                            aria-label="icon label tabs example"
                        >
                            <Tab icon={<HomeIcon />} label="Home" />
                            <Tab icon={<PublishIcon />} label="Summarize shit" />
                        </Tabs>
                        <TextField
                            id="filled-basic"
                            label="Search Notebooks"
                            color="secondary"
                            className={classes.fontColor}
                            InputProps={{
                                
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Box display="flex" alignItems="center" ml={"auto"}>
                            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <PersonIcon />
                            </IconButton>
                            <Typography  variant="h6" >
                                Some username
                            </Typography>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="menu">
                                <SettingsIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;