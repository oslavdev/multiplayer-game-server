import { join } from 'path'
import { makeSchema } from 'nexus'
export const schema = makeSchema({
  types: [], // 1
  outputs: {
    typegen: join(__dirname, '..', 'nexus-typegen.ts'), // 2
    schema: join(__dirname, '..', 'schema.graphql'), // 3
  },
})
