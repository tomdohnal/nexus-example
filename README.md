# Nexus Introductory Example 👋

## Learn more about Nexus

- https://nexusjs.org
- https://github.com/graphql-nexus/schema
- https://nxs.li/learn/examples
- https://nxs.li/learn/tutorial

## Check out all the Code Sandbox examples

- https://nxs.li/playground/introduction
- https://nxs.li/playground/subscriptions
- https://nxs.li/playground/nextjs

## About this Code Sandbox

Try out the following example operations!

```graphql
query search($pattern: String) {
  serach(pattern: $pattern) {
    __typename
    ... on Post {
      body
      title
    }
    ... on User {
      handle
      email
    }
  }
}

query listUsers {
  users {
    id
    handle
    email
    posts {
      id
      title
      body
      published
      tags
    }
  }
}

query listPosts {
  posts {
    id
    title
    body
    published
    tags
    authors {
      id
      handle
      email
    }
  }
}

mutation createDraft($author: ID!) {
  createDraft(title: "Foo", body: "In Fooland today...", authors: [$author]) {
    id
    title
    body
    published
    authors {
      id
      handle
      email
    }
  }
}

mutation registerUser {
  registerUser(email: "kurht@prisma.io", handle: "jasonkuhrt") {
    id
    handle
    email
  }
}

mutation publish($postId: ID!) {
  publishDraft(id: $postId) {
    id
    title
    published
    tags
  }
}
```
