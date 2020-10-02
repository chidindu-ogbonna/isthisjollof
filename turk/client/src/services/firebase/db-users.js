import GenericDB from './db'

export default class UsersDB extends GenericDB {
  constructor() {
    super('users')
  }

  // Here you can extend UserDB with custom methods
}
