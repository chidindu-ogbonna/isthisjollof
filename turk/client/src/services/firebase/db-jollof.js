import GenericDB from './db'

export default class JollofDB extends GenericDB {
  constructor() {
    super('temp')
  }
}
