import * as functions from 'firebase-functions'
import * as common from './util/common'
import { UserRoleOptions } from './models/response'
import { USER_COLLECTION } from './util/constants'

export async function getUserRoleOptionsHandler(
  req: functions.Request,
  res: functions.Response,
  db:FirebaseFirestore.Firestore
): Promise<any> {
  return db
    .collection(USER_COLLECTION)
    .get()
    .then(snap => {
      const datas: UserRoleOptions[] = []
      snap.forEach(doc => {
        const item: UserRoleOptions = {
          user_id: doc.id,
          role: doc.data().role
        }
        datas.push(item)
      })
      return res.status(200).send(common.successResponse({options: datas}))
    })
    .catch(err => {
      console.log('>> Error get data from user collection: ', err.message)
      return res.status(200).send(common.errorResponse(err.message))
    })
}