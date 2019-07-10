import React, { useState, ChangeEvent, FormEvent } from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps, Redirect, Link } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import {
  Grid,
  TextField,
  Typography,
  Avatar as MuiAvatar
} from '@material-ui/core'
import { CallToAction } from '../../components'
import { isLoggedIn, rememberLogin } from '../../auth'
import { Person } from '../../icons'
import { PaperBox } from './'

const Avatar = styled(MuiAvatar)({
  width: 120,
  height: 120
})

const Icon = styled(Person)({
  fontSize: 100
})

const LOG_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      id
    }
  }
`

const Login = (props: RouteComponentProps) => {
  if (isLoggedIn()) {
    return <Redirect to='/home' />
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEmailChange = (e: ChangeEvent) =>
    setEmail((e.target as HTMLInputElement).value)

  const handlePasswordChange = (e: ChangeEvent) =>
    setPassword((e.target as HTMLInputElement).value)

  const [logIn, { loading }] = useMutation(LOG_IN, {
    variables: {
      email,
      password
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // TODO: err handling

    await logIn()

    // TODO: this needs to be invalidated after 2h
    rememberLogin()

    props.history.push('/home')
  }

  return (
    <PaperBox>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} justify='center'>
          <Grid item>
            <Avatar>
              <Icon />
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <TextField
              type='email'
              label='Email'
              placeholder='john.smith@example.com'
              onChange={handleEmailChange}
              fullWidth
              required
            />
            <TextField
              type='password'
              label='Password'
              placeholder={'*'.repeat(12)}
              onChange={handlePasswordChange}
              margin='normal'
              fullWidth
              required
            />
          </Grid>
          <Grid item>
            <Typography>
              Forgot password? <Link to='/reset'>Reset</Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <CallToAction type='submit' disabled={loading}>
              Login
            </CallToAction>
          </Grid>
          <Grid item>
            <Typography>
              Don't have an account? <Link to='/register'>Register</Link>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </PaperBox>
  )
}
export default Login
