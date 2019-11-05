import Joi from './joi'

export const sendMessage = Joi.object().keys({
  chatId: Joi.objectId()
    .required()
    .label('Chat ID'),
  body: Joi.string()
    .required()
    // TODO: .max()
    .label('Body')
})
