import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { createNewUserHandler } from './create-new-user.function'
import { createNewItemHandler } from './create-new-item.function'
import { getUserRoleOptionsHandler } from './get-user-role-options.function'
import { getItemsHandler } from './get-items.function'

const serviceAccount = require('../service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://elegantjaya-4d521.firebaseio.com'
})

const db = admin.firestore()

export const createNewUser = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    return createNewUserHandler(request, response, db)
  }
)

export const createNewItem = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    return createNewItemHandler(request, response, db)
  }
)

export const getUserRoleOptions = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    return getUserRoleOptionsHandler(request, response, db)
  }
)

export const getItems = functions.https.onRequest(
  (request: functions.Request, response: functions.Response) => {
    return getItemsHandler(request, response, db)
  }
)