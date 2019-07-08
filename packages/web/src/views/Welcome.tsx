import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { CallToAction } from '../components'

const Welcome = () => (
  <Box marginTop={10} padding={3} flex={1}>
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h3' align='center' gutterBottom>
          Welcome
        </Typography>
        <Typography variant='h6' align='center'>
          Real-time chat app built with MERN stack and GraphQL
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <CallToAction to='/register' variant='outlined'>
                  Register
                </CallToAction>
              </Grid>
              <Grid item xs={12} md={6}>
                <CallToAction to='/login'>Log In</CallToAction>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
)

export default Welcome
