import React, { useState, Fragment } from 'react'
import {
  Drawer,
  IconButton,
  Link,
  List as MuiList,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { styled } from '@material-ui/styles'
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

const List = styled(MuiList)({
  width: 250
})

const SideBar = () => {
  const [open, setOpen] = useState(false)
  const handleToggle = () => setOpen(!open)

  return (
    <Fragment>
      <IconButton edge='start' color='inherit' onClick={handleToggle}>
        <Menu />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={handleToggle}>
        <List>
          {links.guest.map(({ text, to }, index) => (
            <ListItem button key={index}>
              <ListItemText
                primary={
                  <Link component={AdapterLink} to={to}>
                    {text}
                  </Link>
                }
              />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Fragment>
  )
}

export default SideBar
