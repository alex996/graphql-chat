import React, { useState, Fragment } from 'react'
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { AdapterLink } from '../../components'
import { Menu } from '../../icons'

const links = {
  auth: [
    {
      text: 'Home',
      to: '/home'
    }
  ],
  guest: [
    {
      text: 'Login',
      to: '/login'
    },
    {
      text: 'Register',
      to: '/register'
    }
  ]
}

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

const SideBar = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const handleToggle = () => setOpen(!open)

  return (
    <Fragment>
      <IconButton edge='start' color='inherit' onClick={handleToggle}>
        <Menu />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={handleToggle}>
        <List component='nav' className={classes.list}>
          {links.guest.map(({ text, to }, index) => (
            <ListItem
              button
              to={to}
              key={index}
              component={AdapterLink}
              onClick={handleToggle}
            >
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
}

export default SideBar
