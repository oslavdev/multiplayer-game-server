import { extendType, objectType } from 'nexus'

export const User = objectType({
  name: 'User',           
  definition(t) {
    t.int('id')            
    t.string('username')      
    t.string('email')    
    t.string('password')    
    t.boolean('admin')
    t.boolean('activated')
  },
})

export const UserQuery = extendType({
  type: 'Query',                        
  definition(t) {
    t.nonNull.list.field('users', {     
      type: 'User',                      
      resolve(_root, _args, ctx) {                              
        return ctx.db.users.filter((user: { activated: any }) => user.activated) 
      },
    })
  },
})
