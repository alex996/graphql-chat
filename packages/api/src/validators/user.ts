import Joi from '@hapi/joi'

const email = Joi.string()
  .email()
  .min(8)
  .max(254)
  .trim()
  .lowercase()
  .required()
  .label('Email')

const username = Joi.string()
  .alphanum()
  .min(3)
  .max(30)
  .trim()
  .required()
  .label('Username')

const name = Joi.string()
  .max(254)
  .trim()
  .required()
  .label('Name')

const password = Joi.string()
  .min(8)
  .max(50)
  .regex(/^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d).*$/)
  .message(
    'must have at least one lowercase letter, one uppercase letter, and one digit.'
  )
  .required()
  .label('Password')

export const signUp = Joi.object().keys({
  email,
  username,
  name,
  password
})

export const signIn = Joi.object().keys({
  email,
  password
})
