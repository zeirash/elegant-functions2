import * as Joi from 'joi'

export const createUserSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string().required()
})

const itemPrice = Joi.object().keys({
  price: Joi.number()
            .integer()
            .min(0)
            .required(),
  metric: Joi.string().required(),
  user_id: Joi.string().required()
})
export const createItemSchema = Joi.object().keys({
  name: Joi.string().required(),
  image_path: Joi.array().items(Joi.string().required()).min(1).required(),
  desc: Joi.string().required(),
  price: Joi.array().items(itemPrice.required()).min(1).required()
})