import { extendType, nonNull, objectType, stringArg } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.string("username"),
      t.nonNull.string("email"),
      t.nonNull.boolean("activated"),
      t.nonNull.boolean("admin"),
      t.nonNull.int("level", { description: "Game level of the user" }),
      t.nonNull.float("moneyCents", {
        description: "Money in in-game currency cents",
      });
  },
});

export const UserParams = objectType({
  name: "UserParams",
  definition(t) {
    t.nonNull.int("id"),
      t.nonNull.int("playerId"),
      t.nonNull.int("health"),
      t.nonNull.int("speed"),
      t.nonNull.int("damage"),
      t.nonNull.int("shield"),
      t.nonNull.int("recovery"),
      t.nonNull.int("memory"),
      t.nonNull.int("heating"),
      t.nonNull.int("resistance");
  },
});

/**
 * Get user by ID
 * @name UsersQuery
 * @type {Query}
 * @returns {Object} 
 */
export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.field("user", {
      type: "User",
      resolve: (_root, _args, ctx) => {

        return ctx.db.user.findMany()
      },
    });
  },
});


/**
 * Create a new user
 * @name UsersQuery
 * @type {Mutation}
 * @argument {String} username
 * @argument {String} email
 * @argument {Sting} password
 * @returns {Object}
 */
export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx) => {
        const user = {
          email: args.email,
          username: args.username,
          password: args.password,
          admin: false,
          activated: true,
          level: 1,
          moneyCents: 0,
        };

        return ctx.db.user.create({ data: user })
      },
    });
  },
});
