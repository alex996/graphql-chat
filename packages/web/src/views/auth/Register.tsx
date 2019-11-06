import React, { FormEvent } from 'react'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Grid, TextField, Link } from '@material-ui/core'
import { CallToAction, AdapterLink } from '../../components'
import { rememberLogin } from '../../auth'
import { useInput } from '../../hooks'
import { PaperBox } from './'

const REGISTER = gql`
  mutation signUp(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      name: $name
      password: $password
    ) {
      id
    }
  }
`

const Register = (props: RouteComponentProps) => {
  const name = useInput()
  const username = useInput()
  const email = useInput()
  const password = useInput()
  const passwordConfirmation = useInput()

  const [register, { loading }] = useMutation(REGISTER, {
    variables: {
      name: name.value,
      username: username.value,
      email: email.value,
      password: password.value
    }
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // TODO: err handling

    await register()

    // TODO: this needs to be invalidated after 2h
    rememberLogin()

    props.history.push('/home')
  }

  return (
    <PaperBox>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12}>
            <TextField
              {...name}
              label='Name'
              variant='outlined'
              placeholder='John Smith'
              margin='normal'
              fullWidth
              required
            />
            <TextField
              {...username}
              label='Username'
              variant='outlined'
              placeholder='johnsmith12'
              margin='normal'
              fullWidth
              required
            />
            <TextField
              {...email}
              type='email'
              label='Email'
              variant='outlined'
              placeholder='john.smith@example.com'
              margin='normal'
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
            <TextField
              {...passwordConfirmation}
              type='password'
              label='Confirm Password'
              variant='outlined'
              placeholder={'*'.repeat(12)}
              margin='normal'
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <CallToAction type='submit' disabled={loading}>
              Register
            </CallToAction>
          </Grid>
          <Grid item>
            <Link component={AdapterLink} to='/login' variant='body2'>
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </form>
    </PaperBox>
  )
}

export default Register
