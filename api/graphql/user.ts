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
        return ctx.db.users.findMany({where: { activated: true }}) 
      },
    })
  },
})

type User = {
  username: string,                        
  email: string,
  activated: boolean,
  admin: boolean   
}

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

             const user: User = {
                username: args.username,                        
                email: args.email,
                activated: true,
                admin: false                        
              }

              return ctx.db.users.create({ data: user })
        },
      })
    },
  })
