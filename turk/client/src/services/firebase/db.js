// import { keys } from 'lodash'
import firebase, { firestore } from '@/services/firebase'

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
  }

  /**
   * Create a document in the collection
   * @param {Object} data
   * @param {String} id
   * @returns {Promise<Object>}
   */
  async create(data, id = null) {
    const ref = (await firestore()).collection(this.collectionPath)
    const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp()

    const dateToCreate = {
      ...data,
      created_at: serverTimestamp,
      updated_at: serverTimestamp
    }

    let promise
    if (id) {
      promise = ref
        .doc(id)
        .set(dateToCreate)
        .then(doc => doc.id)
    } else {
      promise = ref.add(dateToCreate).then(doc => doc.id)
    }

    const promiseId = await promise
    return { ...dateToCreate, id: promiseId }
  }

  /**
   * Read a document in the collection
   * @param {String} id
   * @returns {Promise<Object>}
   */
  async read(id) {
    const doc = await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .get()

    if (!doc.exists) return null

    return this.convertObjectTimestampPropertiesToDate({
      id: doc.id,
      ...doc.data()
    })
  }

  /**
   * Read all documents in the collection following constraints
   * @param {String} constraints
   * @returns {Promise<Array>}
   */
  async readAll(constraints = null) {
    const collectionRef = (await firestore()).collection(this.collectionPath)
    let query = collectionRef

    if (constraints) {
      constraints.forEach(constraint => {
        query = query.where(...constraint)
      })
    }

    const formatResult = result =>
      result.docs.map(ref =>
        this.convertObjectTimestampPropertiesToDate({
          id: ref.id,
          ...ref.data()
        })
      )

    return query.get().then(formatResult)
  }

  /**
   * Update a document in the collection
   * @param {Object} data
   * @returns {Promise<void>}
   */
  async update(data) {
    const { id } = data
    const clonedData = { ...data }
    delete clonedData.id

    await (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .update({
        ...clonedData,
        updated_at: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  /**
   * Delete a document in the collection
   * @param {String} id
   * @returns {Promise<void>}
   */
  async delete(id) {
    return (await firestore())
      .collection(this.collectionPath)
      .doc(id)
      .delete()
  }

  /**
   * Convert all object Timestamp properties to date
   * @param obj
   */
  convertObjectTimestampPropertiesToDate(obj) {
    const newObj = {}

    Object.keys(obj)
      // keys(obj)
      .filter(prop => obj[prop] instanceof Object)
      .forEach(prop => {
        if (obj[prop] instanceof firebase.firestore.Timestamp) {
          newObj[prop] = obj[prop].toDate()
        } else {
          this.convertObjectTimestampPropertiesToDate(obj[prop])
        }
      })

    return {
      ...obj,
      ...newObj
    }
  }
}
