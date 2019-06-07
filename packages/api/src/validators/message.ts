import Joi from './joi'

export const sendMessage = Joi.object().keys({
  chatId: Joi.string()
    .objectId()
    .required()
    .label('Chat ID'),
  body: Joi.string()
    .required()
    // TODO: .max()
    .label('Body')
})
