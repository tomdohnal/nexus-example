import { db, Database } from './database'

export type Context = {
  db: Database
}

export function createContext(): Context {
  return {
    db
  }
}
