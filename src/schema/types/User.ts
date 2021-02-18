import { extendType, objectType, stringArg, nonNull } from 'nexus'

export const User = objectType({
  name: 'User',
  nonNullDefaults: {
    output: true
  },
  definition(t) {
    t.id('id')
    t.string('handle', {
      resolve(user) {
        return user.username
      }
    })
    t.string('email')
    t.nonNull.list.nonNull.field('posts', {
      type: 'Post',
      resolve(user, _, ctx) {
        return ctx.db.data.posts.filter((post) => {
          return (
            post.authors.filter((someUserId) => {
              return user.id === someUserId
            }).length > 0
          )
        })
      }
    })
  }
})

export const QueryUser = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('users', {
      type: 'User',
      resolve(_, __, ctx) {
        return ctx.db.data.users
      }
    })
  }
})

export const MutationUser = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('registerUser', {
      type: 'User',
      args: {
        email: nonNull(stringArg()),
        handle: nonNull(stringArg())
      },
      resolve(_, args, ctx) {
        return ctx.db.operations.createUser({
          username: args.handle,
          email: args.email
        })
      }
    })
  }
})
