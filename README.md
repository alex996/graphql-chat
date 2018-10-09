# Apollo GraphQL Server

> Note, this repo follows up a companion [video series](https://www.youtube.com/playlist?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv) on YouTube.

A demo chat GraphQL API built with [apollo-server](https://www.apollographql.com/docs/apollo-server/) on top of [Express](https://expressjs.com/).

## `ApolloServer` class

`apollo-server` library exports a core class that you can instantiate with an options object.

```js
new ApolloServer({
  typeDefs,
  resolvers,
  context,
  mocks,
  formatError,
  ...
})
```

In [v1](https://www.apollographql.com/docs/apollo-server/v1/example.html), `typeDefs` and `resolvers` were passed to `makeExecutableSchema`. The resulting `schema` would then be supplied to `graphqlExpress` middleware. In v2, `ApolloServer` only requires two arguments,

- `typeDefs` (`Object`) to declare the data types with SDL, and
- `resolvers` (`Object`) to resolve the schema with resolver functions

Some other optional arguments include

- `context` (`Object`) to share data across resolvers
- `mocks` (`Boolean`) to enable randomly-generated mocks
- `formatError` (`Object` *or* `Function`) to fine-tune the error format
- `subscriptions` (`String` *or* `Object`) to configure real-time updates
- `schema` (`Object`) for backwards compatibility with v1

> To see a full list of arguments, refer to [`apollo-server` API](https://www.apollographql.com/docs/apollo-server/api/apollo-server.html#ApolloServer).

Previously, `typeDefs` were written in SDL using a template literal, which didn't allow for syntax highlighting. As of v2, `typeDefs` are invoked on `gql` with a tagged template, and can be color coded with an editor extension (such as [GraphQL for VSCode](https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode)).

```js
const typeDefs = gql`
  type Query {
    user(id: ID!): User
  }
`
```

`resolvers`, unlike `rootValue` in `express-graphql`, allow for root-level *and* nested resolvers. Each resolver function falls under `Query`, `Mutation`, `Subscription`, or custom object type, and has the following signature

```js
const resolvers = {
  Query: {
    user: (root, args, context, info) => { /*...*/ }
  }
}
```

This is different from `rootValue` resolvers in `express-graphql`

```js
const rootValue = {
  user: (args, context, info) => { /*...*/ }
}
```

In `apollo-server`, `root` evaluates to either the parent field, or `rootValue` for top-level resolvers. See its [value differs](https://www.apollographql.com/docs/apollo-server/essentials/data.html#parent) depending on the field. As with `express-graphql`, any fields that are not defined explicitly will be accessed as object props or invoked as methods on the `root`.
