import Joi from './joi'

export const objectId = Joi.object().keys({
  id: Joi.string().objectId().label('Object ID')
})
