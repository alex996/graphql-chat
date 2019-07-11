import React from 'react'
import { Redirect } from 'react-router-dom'
import { Box, Typography } from '@material-ui/core'
import { isLoggedIn } from '../auth'

const Home = () => {
  if (!isLoggedIn()) {
    return <Redirect to='/login' />
  }

  return (
    <Box marginTop={2}>
      <Typography variant='h6'>Home</Typography>
    </Box>
  )
}
export default Home
