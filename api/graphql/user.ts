import * as Constants from '../constants';
import * as Utils from '../utils';

import { extendType, nonNull, objectType, stringArg, unionType } from 'nexus';

export const User = objectType({
  name: 'User',
  description: 'Basic user type',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('username');
    t.nonNull.string('email');
    t.nonNull.boolean('success');
  },
});

export const ErrorBody = objectType({
  name: 'ErrorBody',
  description: 'Errors that return to submitted forms',
  definition(t) {
    t.nonNull.string('field');
    t.nonNull.string('message');
    t.nonNull.int('status');
  },
});

export const SuccessResponse = objectType({
  name: 'SuccessResponse',
  description: 'Successful user response',
  definition(t) {
    t.nonNull.boolean('success');
    t.nonNull.field('user', { type: 'User' });
  },
});

export const FieldError = objectType({
  name: 'FieldError',
  description: 'Errors that return to submitted forms',
  definition(t) {
    t.nonNull.boolean('success');
    t.nonNull.field('error', { type: 'ErrorBody' });
  },
});

export const UserUnion = unionType({
  name: 'UserUnion',
  description: 'Union type to return either user or error',
  definition(t) {
    t.members('SuccessResponse', 'FieldError');
  },
  resolveType(data) {
    const __typename = data.success ? 'SuccessResponse' : 'FieldError';

    return __typename;
  },
});

export const UsersQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        //TODO: select only required fields
        return ctx?.db?.users?.findMany({ where: { admin: false } }) || [];
      },
    });
  },
});

type User = {
  username: string;
  password: string;
  email: string;
  activated: boolean;
};

/**
 * @name UserMutation
 * 
 * This is a create user mutation
 * 
 * 
 * @example
 * mutation Mutation($username: String!, $email: String!, $password: String!, $confirmPassword: String!) {
  createUser(username: $username, email: $email, password: $password, confirmPassword: $confirmPassword) {
    ... on FieldError {
      success
      error {
        field
        message
        status
      }
    }
    ... on SuccessResponse {
      success
      user {
        username
        id
        email
      }
    }
  }
}

 */
export const UserMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'UserUnion',
      description: 'This schema is for creating a new user',
      args: {
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        confirmPassword: nonNull(stringArg()),
      },
      resolve: async (_root, args, ctx) => {
        if (!args.password.match(Constants.PasswordPattern)) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'password',
              message:
                'Password does not match schema. You need to have at least one capital letter, one special symbol and one number!',
              status: 200,
            },
          };
        }

        if (args.password != args.confirmPassword) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'password',
              message: "Your password confirmation doesn't match password.",
              status: 200,
            },
          };
        }

        if (!Utils.validateEmail(args.email)) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'email',
              message: 'Email does not match the pattern.',
              status: 200,
            },
          };
        }

        const existingUser = await ctx.db.users.findUnique({
          where: { email: args.email },
        });

        if (existingUser) {
          return {
            __typename: 'FieldError',
            success: false,
            error: {
              field: 'email',
              message: 'User with this email already exists.',
              status: 200,
            },
          };
        }

        const user: User = {
          username: args.username,
          password: args.password,
          email: args.email,
          activated: true,
        };

        const createdUser = await ctx.db.users.create({ data: user });

        return { success: true, user: createdUser };
      },
    });
  },
});
