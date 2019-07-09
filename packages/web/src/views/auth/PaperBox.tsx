import React from 'react'
import { styled, Theme } from '@material-ui/core/styles'
import { Box, Grid, Paper as MuiPaper } from '@material-ui/core'

const Paper = styled(MuiPaper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 420
}))

const PaperBox = (props: any) => (
  <Box marginTop={10} marginBottom={10} padding={3} flex={1}>
    <Grid container justify='center' spacing={6}>
      <Grid item>
        <Paper elevation={2} {...props} />
      </Grid>
    </Grid>
  </Box>
)

export default PaperBox
