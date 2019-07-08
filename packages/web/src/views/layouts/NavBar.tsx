import React from 'react'
import { styled } from '@material-ui/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { MoreVert } from '../../icons'
import { SideBar } from './'

const Brand = styled(Typography)({
  flexGrow: 1
})

const Navbar = () => (
  <AppBar position='fixed'>
    <Toolbar>
      <SideBar />
      <Brand variant='h6'>GraphQL Chat</Brand>
      <IconButton edge='end' color='inherit'>
        <MoreVert />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default Navbar
