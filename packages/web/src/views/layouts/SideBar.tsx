import React, { useState } from 'react'
import gql from 'graphql-tag'
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles
} from '@material-ui/core'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { AdapterLink } from '../../components'
import { isLoggedIn, forgetLogin } from '../../auth'
import { Menu } from '../../icons'

const useStyles = makeStyles({
  list: {
    width: 250
  }
})

const LOG_OUT = gql`
  mutation {
    signOut
  }
`

interface LinkListProps {
  links: {
    to?: string
    text: string
    onClick: VoidFunction
    disabled?: boolean
  }[]
}

const LinkList = ({ links }: LinkListProps) => {
  const classes = useStyles()

  return (
    <List component='nav' className={classes.list}>
      {links.map(({ to, text, ...rest }, index) => (
        <ListItem
          button
          key={index}
          {...(to && {
            to,
            component: AdapterLink
          })}
          {...rest}
        >
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  )
}

interface GuestListProps {
  onToggle: VoidFunction
}

const GuestList = ({ onToggle }: GuestListProps) => {
  const links = [
    {
      to: '/login',
      text: 'Log In',
      onClick: onToggle
    },
    {
      to: '/register',
      text: 'Register',
      onClick: onToggle
    }
  ]

  return <LinkList links={links} />
}

interface AuthListProps extends RouteComponentProps {
  onToggle: VoidFunction
}

const AuthList = withRouter(({ onToggle, history }: AuthListProps) => {
  const [logOut, { loading }] = useMutation(LOG_OUT)

  const handleLogout = async () => {
    await logOut()

    forgetLogin()

    onToggle()

    history.push('/login')
  }

  const links = [
    {
      to: '/home',
      text: 'Home',
      onClick: onToggle
    },
    {
      to: '/profile',
      text: 'Profile',
      onClick: onToggle
    },
    {
      text: 'Log Out',
      onClick: handleLogout,
      disabled: loading
    }
  ]

  return <LinkList links={links} />
})

const SideBar = () => {
  const [open, setOpen] = useState(false)
  const handleToggle = () => setOpen(!open)

  return (
    <>
      <IconButton edge='start' color='inherit' onClick={handleToggle}>
        <Menu />
      </IconButton>
      <Drawer anchor='left' open={open} onClose={handleToggle}>
        {isLoggedIn() ? (
          <AuthList onToggle={handleToggle} />
        ) : (
          <GuestList onToggle={handleToggle} />
        )}
      </Drawer>
    </>
  )
}

export default SideBar
