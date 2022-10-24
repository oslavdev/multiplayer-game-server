import * as Nexus from 'nexus'
import * as Path from 'path'
import * as types from './graphql'

export const schema = Nexus.makeSchema({
    types,
    outputs: {
        typegen: Path.join(__dirname, "..", 'nexus-typegen.ts'),
        schema: Path.join(__dirname, "..", "schema.graphql")
    },
    contextType: {                                    
        module: Path.join(__dirname, "./context.ts"),        
        export: "Context",                         
      }
})
