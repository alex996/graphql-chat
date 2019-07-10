import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Grid, TextField, Typography } from '@material-ui/core'
import { CallToAction } from '../../components'
import { isLoggedIn } from '../../auth'
import { PaperBox } from './'

const Register = () => {
  if (isLoggedIn()) {
    return <Redirect to='/home' />
  }

  return (
    <PaperBox>
      <Grid container spacing={3} justify='center'>
        <Grid item xs={12}>
          <TextField
            label='Name'
            placeholder='John Smith'
            margin='normal'
            fullWidth
            required
          />
          <TextField
            label='Username'
            placeholder='johnsmith12'
            margin='normal'
            fullWidth
            required
          />
          <TextField
            type='email'
            label='Email'
            placeholder='john.smith@example.com'
            margin='normal'
            fullWidth
            required
          />
          <TextField
            type='password'
            label='Password'
            placeholder={'*'.repeat(12)}
            margin='normal'
            fullWidth
            required
          />
          <TextField
            type='password'
            label='Confirm Password'
            placeholder={'*'.repeat(12)}
            margin='normal'
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <CallToAction>Register</CallToAction>
        </Grid>
        <Grid item>
          <Typography variant='body1'>
            Already have an account? <Link to='/login'>Login</Link>
          </Typography>
        </Grid>
      </Grid>
    </PaperBox>
  )
}

export default Register
