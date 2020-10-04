import { db } from './index'

export default class GenericDB {
  constructor(collectionPath) {
    this.collectionPath = collectionPath
  }

  async update(data) {
    const { id } = data
    const clonedData = { ...data }
    await db
      .collection(this.collectionPath)
      .doc(id)
      .update({ ...clonedData })
  }
}
