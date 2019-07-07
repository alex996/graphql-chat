import React from 'react'
import { makeStyles, Theme, Fab } from '@material-ui/core'
import { FabProps } from '@material-ui/core/Fab'
import { AdapterLink } from './'

// FIXME: using hook API until material-ui@15695 is fixed
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    width: '100%'
  }
}))

interface Props extends FabProps {
  to: string
}

const CallToAction = (props: Props) => {
  const classes = useStyles()
  return (
    // @ts-ignore FIXME:
    <Fab
      className={classes.root}
      component={AdapterLink}
      variant='extended'
      color='primary'
      size='large'
      {...props}
    />
  )
}

export default CallToAction
