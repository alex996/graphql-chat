import Joi from './joi'

export const sendMessage = Joi.object().keys({
  chatId: Joi.objectId()
    .required()
    .label('Chat ID'),
  body: Joi.string()
    .required()
    .max(4_000) // TODO: Truncate into multiple msgs
    .label('Body')
})
