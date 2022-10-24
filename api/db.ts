export interface User {
    id: number
    username: string
    email: string
    admin: boolean
    activated: boolean
  }

  export interface Db {
    users: User[]
  }
  export const db: Db = {
    users: [{ id: 1, username: 'Jeff', email:'vandermeer@mail.com', activated: true, admin: false }],
  }
