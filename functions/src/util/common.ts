import * as Joi from 'joi'
import * as _ from 'lodash'

export function successResponse(
  payload: any | any[] = {},
  success: boolean = true
) {
  return { success, payload: _.isNull(payload) ? {} : payload }
}

export function errorResponse(
  errors: any = {},
  code: string = "500",
  success: boolean = false
) {
  return { code, success, errors }
}

// Joi validation options
const validationOptions: Joi.ValidationOptions = {
  abortEarly: false, // abort after the last validation error
  allowUnknown: true, // allow unknown keys that will be ignored
  stripUnknown: true // remove unknown keys from the validated data
}

export function validateReq(data: any, schema: Joi.SchemaLike): Promise<void> {
  return Joi.validate(data, schema, validationOptions, err => {
    if (err) {
      const errors = _.map(err.details, ({ message }) =>
        message.replace(/['"]/g, "")
      )
      return Promise.reject(new Error(JSON.stringify(errors)))
    }

    return Promise.resolve()
  })
}
