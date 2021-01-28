import * as functions from 'firebase-functions'
import * as common from './util/common'
import { CreateItemRequest } from './models/request'
import { createItemSchema } from './util/validation'
import { ITEM_COLLECTION } from './util/constants'

export async function createNewItemHandler(
  req: functions.Request,
  res: functions.Response,
  db:FirebaseFirestore.Firestore
): Promise<any> {
  const reqBody: CreateItemRequest = req.body
  return common
    .validateReq(reqBody, createItemSchema)
    .then(() => {
      return db
        .collection(ITEM_COLLECTION)
        .add({
          name: reqBody.name,
          desc: reqBody.image_path,
          image: reqBody.image_path,
          priceSetup: reqBody.price
        })
        .then(() => {
          return res.status(200).send(common.successResponse())
        })
        .catch(err => {
          return res.status(400).send(common.errorResponse(err.message))
        })
    })
    .catch(err => {
      return res.status(400).send(common.errorResponse(err.message, "400"))
    })
}