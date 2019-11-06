import React, { FormEvent } from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import { useMutation } from '@apollo/react-hooks'
import { Grid, Avatar as MuiAvatar, TextField, Link } from '@material-ui/core'
import { CallToAction, AdapterLink } from '../../components'
import { rememberLogin } from '../../auth'
import { useInput } from '../../hooks'
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
  const email = useInput()
  const password = useInput()

  const [logIn, { loading }] = useMutation(LOG_IN, {
    variables: {
      email: email.value,
      password: password.value
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
        <Grid container spacing={2} justify='center'>
          <Grid item>
            <Avatar>
              <Icon />
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...email}
              type='email'
              label='Email'
              variant='outlined'
              placeholder='john.smith@example.com'
              fullWidth
              required
            />
            <TextField
              {...password}
              type='password'
              label='Password'
              variant='outlined'
              placeholder={'*'.repeat(12)}
              margin='normal'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CallToAction type='submit' disabled={loading}>
              Login
            </CallToAction>
          </Grid>
          <Grid item xs={12}>
            <Grid container justify='space-between'>
              <Grid item>
                <Link component={AdapterLink} to='/reset'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={AdapterLink} to='/register' variant='body2'>
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </PaperBox>
  )
}
export default Login
