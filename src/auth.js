import passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from './models'
import { AuthenticationError, UserInputError } from 'apollo-server-express'
import { SESS_NAME } from './config'

export const ensureSignedIn = resolver => (root, args, context, info) => {
  if (!context.req.isAuthenticated()) {
    throw new AuthenticationError('You must be signed in.')
  }
  return resolver(root, args, context, info)
}

export const ensureSignedOut = resolver => (root, args, context, info) => {
  if (context.req.isAuthenticated()) {
    throw new AuthenticationError('You are already signed in.')
  }
  return resolver(root, args, context, info)
}

export const signIn = (req, user) =>
  new Promise((resolve, reject) => {
    req.login(user, err => {
      if (err) reject(err)
      resolve()
    })
  })

export const signInOrFail = (req, email, password) =>
  new Promise((resolve, reject) => {
    return passport.authenticate('local', (err, user) => {
      if (err) reject(err)

      req.login(user, err => {
        if (err) reject(err)
        resolve(user)
      })
    })({ body: { email, password } })
  })

export const signOut = (req, res) =>
  new Promise((resolve, reject) => {
    req.session.destroy(err => {
      if (err) reject(err)

      res.clearCookie(SESS_NAME)

      resolve(true)
    })
  })

passport.use(
  new Strategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email })

        if (!user || !await user.matchesPassword(password)) {
          return done(new UserInputError('Invalid email or password.'))
        }

        done(null, user)
      } catch (e) {
        done(e)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user)) // gets called on each req :-/
})

export default passport
