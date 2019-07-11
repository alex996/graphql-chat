import React from 'react'
import { styled } from '@material-ui/styles'
import { Link, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { AdapterLink } from '../../components'
import { MoreVert } from '../../icons'
import { SideBar } from './'

const FullWidth = styled('div')({
  flexGrow: 1
})

const Navbar = () => (
  <AppBar position='fixed'>
    <Toolbar>
      <SideBar />
      <FullWidth>
        <Link
          to='/'
          component={AdapterLink}
          color='inherit'
          underline='none'
          variant='h6'
        >
          GraphQL Chat
        </Link>
      </FullWidth>
      <IconButton edge='end' color='inherit'>
        <MoreVert />
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default Navbar
