import Joi from './joi'

export const startChat = (userId: string) =>
  Joi.object().keys({
    title: Joi.string()
      .min(6)
      .max(30)
      .label('Title'),
    userIds: Joi.array()
      .min(1)
      .max(100)
      .unique()
      .items(
        Joi.objectId()
          .not(userId)
          .label('User ID')
      )
      .label('User IDs')
  })
