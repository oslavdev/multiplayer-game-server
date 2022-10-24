import { extendType, nonNull, objectType, stringArg } from 'nexus'

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
        return ctx.db.users.filter((user: { activated: boolean }) => user.activated) 
      },
    })
  },
})

export const UserMutation = extendType({
    type: 'Mutation',
    definition(t) {
      t.nonNull.field('createUser', {
        type: 'User',
        args: {                                        
            username: nonNull(stringArg()),                
            email: nonNull(stringArg()),                  
          },
        resolve(_root, args, ctx) {

            const user: any = {
                id: ctx.db.users.length + 1,
                username: args.username,                         
                email: args.email                        
              }

              ctx.db.users.push(user)

              return user
        },
      })
    },
  })
