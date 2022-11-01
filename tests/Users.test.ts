import { createTestContext } from './__helpers'
const ctx = createTestContext()
it('ensures that a user can be created', async () => {
  // Create a new draft
  const createUserResult = await ctx.client.request(`           
    mutation {
      createUser(username: "Misato", email: "misato@nerv.com") {           
        id
        username
        email
        admin
        activated
      }
    }
  `)

  expect(createUserResult).toMatchInlineSnapshot(`
{
  "createUser": {
    "activated": null,
    "admin": null,
    "email": "misato@nerv.com",
    "id": 2,
    "username": "Misato",
  },
}
`)             
})
