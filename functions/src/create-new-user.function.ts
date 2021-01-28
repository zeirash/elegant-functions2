import * as functions from 'firebase-functions'
import * as common from './util/common'
import { CreateUserRequest } from './models/request'
import { createUserSchema } from './util/validation'
import { USER_COLLECTION } from './util/constants'

export async function createNewUserHandler(
  req: functions.Request,
  res: functions.Response,
  db:FirebaseFirestore.Firestore
): Promise<any> {
  const reqBody: CreateUserRequest = req.body

  return common
    .validateReq(reqBody, createUserSchema)
    .then(() => {
      return db
        .collection(USER_COLLECTION)
        .add({
          username: reqBody.username,
          password: reqBody.password,
          role: reqBody.role
        })
        .then(() => {
          return res.status(200).send(common.successResponse())
        })
        .catch(err => {
          console.log('>> Error add data to user collection: ', err.message)
          return res.status(200).send(common.errorResponse(err.message))
        })
    })
    .catch(err => {
      return res.status(400).send(common.errorResponse(err.message, "400"))
    })
}