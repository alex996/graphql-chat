import React from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@material-ui/core/styles'
import {
  Grid,
  TextField,
  Typography,
  Avatar as MuiAvatar
} from '@material-ui/core'
import { CallToAction } from '../../components'
import { Person } from '../../icons'
import { PaperBox } from './'

const Avatar = styled(MuiAvatar)({
  width: 120,
  height: 120
})

const Icon = styled(Person)({
  fontSize: 100
})

const Login = () => (
  <PaperBox>
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
      </Grid>
      <Grid item>
        <Typography>
          Forgot password? <Link to='/reset'>Reset</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <CallToAction>Login</CallToAction>
      </Grid>
      <Grid item>
        <Typography>
          Don't have an account? <Link to='/register'>Register</Link>
        </Typography>
      </Grid>
    </Grid>
  </PaperBox>
)

export default Login
