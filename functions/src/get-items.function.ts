import * as functions from 'firebase-functions'
import * as common from './util/common'
import { ItemResponse } from './models/response'
import { ITEM_COLLECTION } from './util/constants'

export async function getItemsHandler(
  req: functions.Request,
  res: functions.Response,
  db:FirebaseFirestore.Firestore
): Promise<any> {
  return db
  .collection(ITEM_COLLECTION)
  .get()
  .then(snap => {
    const datas: ItemResponse[] = []
    snap.forEach(doc => {
      const data = doc.data()
      const item: ItemResponse = {
        id: doc.id,
        desc: data.desc,
        image: data.image,
        name: data.name,
        price_setup: data.priceSetup
      }
      datas.push(item)
    })
    return res.status(200).send(common.successResponse({items: datas}))
  })
  .catch(err => {
    console.log('>> Error get data in item collection: ', err.message)
    return res.status(200).send(common.errorResponse(err.message))
  })
}