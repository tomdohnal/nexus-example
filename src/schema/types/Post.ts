import { extendType, idArg, objectType, stringArg, nonNull, list } from 'nexus'

export const Post = objectType({
  name: 'Post',
  nonNullDefaults: {
    output: true
  },
  definition(t) {
    t.id('id')
    t.string('title', {
      resolve(post) {
        return post.heading
      }
    })
    t.string('body', {
      resolve(post) {
        return post.content
      }
    })
    t.boolean('published', {
      resolve(post) {
        return post.isPublished
      }
    })
    t.nonNull.list.nonNull.string('tags')
    t.nonNull.list.nonNull.field('authors', {
      type: 'User',
      resolve(post, __, ctx) {
        return ctx.db.data.users.filter((user) => {
          return (
            user.posts.filter((somePostId) => {
              return post.id === somePostId
            }).length > 0
          )
        })
      }
    })
  }
})

export const QueryPost = extendType({
  type: 'Query',
  definition(t) {
    t.list.nonNull.field('posts', {
      type: 'Post',
      resolve(_, __, ctx) {
        return ctx.db.data.posts
      }
    })
  }
})

export const MutationPost = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('createDraft', {
      type: 'Post',
      args: {
        title: nonNull(stringArg()),
        body: nonNull(stringArg()),
        authors: nonNull(list(nonNull(idArg()))),
        tags: list(nonNull(stringArg()))
      },
      resolve(_, args, ctx) {
        return ctx.db.operations.createPost({
          heading: args.title,
          content: args.body,
          authors: args.authors,
          tags: args.tags ?? [],
          isPublished: false
        })
      }
    })
    t.nonNull.field('publishDraft', {
      type: 'Post',
      args: { id: nonNull(idArg()) },
      resolve(_, args, ctx) {
        return ctx.db.operations.updatePost(args.id, {
          isPublished: true
        })
      }
    })
  }
})
