import React from 'react'
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@material-ui/core'
import { styled, Theme } from '@material-ui/core/styles'
import { CallToAction } from '../components'
import { Chat, PermMedia, Lock } from '../icons'

const features = [
  {
    primary: 'Instant Messaging',
    secondary: 'Talk to your friends in real time',
    Icon: Chat
  },
  {
    primary: 'Media Support',
    secondary: 'Share gifs and other images with peps',
    Icon: PermMedia
  },
  {
    primary: 'Secure Exchange',
    secondary: 'Stay in full control of your privacy',
    Icon: Lock
  }
]

const LargeAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  height: 60,
  width: 60,
  marginRight: theme.spacing(2)
}))

const SpacedListItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  padding: `${theme.spacing(2)}px 0`
}))

const Welcome = () => (
  <Box marginTop={10} padding={4} flex={1}>
    <Grid container spacing={8}>
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
            <CallToAction to='/login'>Log In</CallToAction>
            <CallToAction to='/register' color='default'>
              Register
            </CallToAction>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify='center'>
          <Grid item xs={12} sm={6} lg={4} xl={3}>
            <Typography variant='h5' align='center' gutterBottom>
              Packed with Features
            </Typography>
            <List>
              {features.map(({ primary, secondary, Icon }, index) => (
                // @ts-ignore FIXME:
                <SpacedListItem key={index}>
                  <ListItemIcon>
                    <LargeAvatar>
                      <Icon fontSize='large' />
                    </LargeAvatar>
                  </ListItemIcon>
                  <ListItemText
                    primary={primary}
                    secondary={secondary}
                    primaryTypographyProps={{
                      color: 'primary',
                      variant: 'h6'
                    }}
                    secondaryTypographyProps={{
                      variant: 'subtitle1'
                    }}
                  />
                </SpacedListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Box>
)

export default Welcome
