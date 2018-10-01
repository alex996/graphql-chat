# Intro to GraphQL

> Note, this repo follows up a companion [video series](https://www.youtube.com/playlist?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv) on YouTube.

A demo terminal chat app that uses [GraphQL.js](https://graphql.org/graphql-js/).

## Anatomy of `graphql`

GraphQL.js exports `graphql` function for parsing and executing GraphQL queries.

```js
graphql(schema, query, rootValue, contextValue, ...)
```

It expects at least two arguments:

- `schema` (`String`) with type definitions written in [GraphQL SDL](https://alligator.io/graphql/graphql-sdl/), and
- `query` (`String`) operation, such as a query or mutation

We can also pass in an optional third argument

- `rootValue` (object literal) used to resolve the top-level fields defined in your schema

```js
const rootValue = {
  field: (args, context, info) => { /*...*/ }
}
```

Each top-level resolver function will accept

- `args`, an object with arguments passed to the query or mutation
- `context`, a `contextValue` object supplied to `graphql`, and
- [`info`](https://www.prisma.io/blog/graphql-server-basics-demystifying-the-info-argument-in-graphql-resolvers-6f26249f613a/), an object with query AST and execution information

> Note that when defining your schema with `GraphQLObjectType` instead of SDL, `fields` will be resolved with a function that first accepts a `root`/`parent` value: `resolve: (root, args, context, info) => { /* ... */ }`.

Another optional argument in `graphql` I did not mention is `contextValue`

- `contextValue` (object literal) passed to resolver functions after arguments to define shared data

See how `rootValue` is [different](https://github.com/graphql/graphql-js/issues/735#issuecomment-302456482) from `contextValue`.
