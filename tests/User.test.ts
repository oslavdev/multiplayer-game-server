import { createTestContext } from './__helpers'
const ctx = createTestContext()

it('ensures that a new user can be created and activated', async () => {
  // Create a new user
  const createUserResult = await ctx.client.request(`           
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      username
      email
      activated
      admin
      level
      moneyCents
      id
    }
  }
  `, { username: 'JeffVandermeer', email:'jeff@mail.com', password:"racoonwatcher21" })

  // Snapshot that draft and expect `published` to be false
  expect(createUserResult).toMatchInlineSnapshot(`
{
  "createUser": {
    "activated": true,
    "admin": false,
    "email": "jeff@mail.com",
    "id": 3,
    "level": 1,
    "moneyCents": 0,
    "username": "JeffVandermeer",
  },
}
`)    
const persistedData = await ctx.db.post.findMany()
expect(persistedData).toMatchInlineSnapshot()         
})
