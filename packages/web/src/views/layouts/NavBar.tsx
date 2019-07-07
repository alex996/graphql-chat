import React from 'react'
import { styled } from '@material-ui/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { AccountCircle, Menu } from '../../icons'

const Brand = styled(Typography)({
  flexGrow: 1
})

const Navbar = () => (
  <AppBar position='fixed'>
    <Toolbar>
      <IconButton edge='start' color='inherit'>
        <Menu />
      </IconButton>
      <Brand variant='h6'>GraphQL Chat</Brand>
      <IconButton edge='end' color='inherit'>
        <AccountCircle />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default Navbar
