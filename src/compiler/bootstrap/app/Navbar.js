import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import classNames from 'classnames'

import AppBar from 'material-ui/AppBar'
import Button from 'material-ui/Button'
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'
import Grid from 'material-ui/Grid'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { ListItemText } from 'material-ui/List'
import { MenuItem, MenuList } from 'material-ui/Menu'

const drawerWidth = 240

const styles = theme => ({
  root: {
    width: '100%',
    zIndex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    height: '100vh',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    // padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      content: {
        height: 'calc(100% - 64px)',
        marginTop: 64,
      },
    },
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
})

@withStyles(styles, { withTheme: true })
@withRouter
@connect(state => ({ theme: state.theme }))
class Navbar extends React.Component {
  state = {
    open: true,
    anchor: 'left',
  }

  handleDrawerOpen = () => {
    this.setState({ open: true })
  }

  handleDrawerClose = () => {
    this.setState({ open: false })
  }

  navTo = link => () => {
    this.props.history.push(link)
  }

  renderNavLink = ({ link, name }) => (
    <MenuItem onClick={this.navTo(link)} key={link}><ListItemText primary={name} /></MenuItem>
  )

  setTheme = theme => () => this.props.dispatch({ type: 'SET_THEME', payload: theme })

  render () {
    const { classes, component, links } = this.props
    const { open } = this.state

    const drawer = (
      <Drawer
        type="persistent"
        classes={{ paper: classes.drawerPaper }}
        anchor="left"
        open={open}
      >
        <div className={classes.drawerInner}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <MenuList>
            {links.map(this.renderNavLink)}
          </MenuList>
          <Divider />
          <MenuList>
            <MenuItem onClick={this.setTheme('light')}><Button>Light theme</Button></MenuItem>
            <MenuItem onClick={this.setTheme('dark')}><Button>Dark theme</Button></MenuItem>
          </MenuList>
        </div>
      </Drawer>
    )

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open,
              [classes['appBarShift-left']]: open,
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color="contrast"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                React Plugin Architecture POC Demo
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: open,
              [classes['contentShift-left']]: open,
            })}
          >
            <Grid style={{ padding: '1rem' }}>
              {component}
            </Grid>
          </main>
        </div>
      </div>
    )
  }
}

Navbar.propTypes = {
  classes: PropTypes.object,
  component: PropTypes.object.isRequired,
}

export default Navbar
