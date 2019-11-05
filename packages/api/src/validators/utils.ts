import Joi from './joi'

export const objectId = Joi.object().keys({
  id: Joi.objectId().label('Object ID')
})
