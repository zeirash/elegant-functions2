import * as functions from 'firebase-functions'
// import * as common from './util/common'
// import { ItemResponse } from './models/response'
import { ITEM_COLLECTION } from './util/constants'

export async function getItemHandler(
  req: functions.Request,
  res: functions.Response,
  db:FirebaseFirestore.Firestore
): Promise<any> {
  return db
  .collection(ITEM_COLLECTION)
  .doc()
  .get()
  .then(snap => {
    console.log(snap)
  })
  .catch(err => {
    console.log(err)
  })
}