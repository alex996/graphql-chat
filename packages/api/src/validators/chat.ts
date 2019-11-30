import Joi from './joi'

const title = Joi.string()
  .min(6)
  .max(30)
  .label('Title')

const userIds = (userId: string) =>
  Joi.array()
    .min(1)
    .max(100)
    .unique()
    .items(
      Joi.objectId()
        .not(userId)
        .label('User ID')
    )
    .label('User IDs')

export const startChat = (userId: string) =>
  Joi.object().keys({
    title,
    userIds: userIds(userId)
  })

export const inviteUsers = (userId: string) =>
  Joi.object().keys({
    chatId: Joi.objectId().required(),
    userIds: userIds(userId)
  })
