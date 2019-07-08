import React from 'react'
import { makeStyles, Theme, Button } from '@material-ui/core'
import { ButtonProps } from '@material-ui/core/Button'
import { AdapterLink } from './'

// FIXME: using hook API until material-ui@15695 is fixed
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1.5)
  }
}))

interface Props extends ButtonProps {
  to: string
}

const CallToAction = (props: Props) => {
  const classes = useStyles()
  return (
    // @ts-ignore FIXME:
    <Button
      className={classes.root}
      component={AdapterLink}
      variant='contained'
      color='primary'
      size='large'
      {...props}
    />
  )
}

export default CallToAction
