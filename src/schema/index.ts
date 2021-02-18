import { makeSchema } from 'nexus'
import * as Path from 'path'
import * as types from './types'

const schema = makeSchema({
  types,
  outputs: {
    typegen: Path.join(__dirname, '../../node_modules/@types/typegen-nexus/index.d.ts')
  },
  sourceTypes: {
    modules: [{ alias: 'Database', module: Path.join(__dirname, '../database.ts') }]
  },
  contextType: {
    module: Path.join(__dirname, '../context.ts'),
    export: 'Context'
  }
})

export default schema
