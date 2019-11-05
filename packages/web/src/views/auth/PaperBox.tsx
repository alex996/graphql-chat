import React from 'react'
import { styled, Theme } from '@material-ui/core/styles'
import { Box, Grid, Paper as MuiPaper } from '@material-ui/core'
import { PaperProps } from '@material-ui/core/Paper'

const Paper = styled(MuiPaper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400
}))

const PaperBox = (props: PaperProps) => (
  <Box marginTop={10} marginBottom={10} padding={2} flex={1}>
    <Grid container justify='center' spacing={4}>
      <Grid item>
        <Paper elevation={2} {...props} />
      </Grid>
    </Grid>
  </Box>
)

export default PaperBox
