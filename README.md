# Express GraphQL Server

> Note, this repo follows up a companion [video series](https://www.youtube.com/playlist?list=PLcCp4mjO-z9_y8lByvIfNgA_F18l-soQv) on YouTube.

A demo chat web API built with [Express](http://expressjs.com/) framework using [express-graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) middleware.

## `express-graphql` HTTP middleware

`express-graphl` module exports a route handler that you can attach to a `/graphql` endpoint.

```js
graphqlHTTP({
  schema,
  rootValue,
  graphiql,
  context,
  formatError,
  ...
})
```

The only required argument is

- `schema` (`String`) with type definitions

Other optional arguments include

- `rootValue` (`Object`) to resolve top-level fields
- `graphiql` (`Boolean`) to toggle GraphiQL interface
- `context` (`Object` *or* `Function`) to share data
- `formatError` (`Function`) to format error responses

`rootValue` will be passed to `graphql` function as `rootValue`. Your schema could define fields that cannot be resolved on the data source. In that case, resolver functions can return objects wrapped with an [ES6 class](https://graphql.org/graphql-js/object-types/) whose methods or getters will provide for the missing fields.

```js
class User {
  get profileUrl () { /*...*/ }

  messages (args, context, info) { /*...*/ }
}

const rootValue = {
  user: (args, context, info) => new User(user)
}
```

> Note that getters cannot have any formal arguments, whereas methods will follow the resolver function signature.

When passed to `graphqlHTTP`, `context` will be forwarded as `contextValue` to `graphql` function, and made available to root resolvers. It can be provided as an object, or a function that accepts the `Request` instance from Express and returns an object

```js
graphqlHTTP({
  context: req => { /*...*/ }
})
```

[`formatError`](https://github.com/graphql/express-graphql#debugging-tips) is another optional argument that overwrites the default spec-compliant error response format.

```js
formatError: error => { /*...*/ }
```

See [`graphqlHTTP` signature](https://graphql.org/graphql-js/express-graphql/#graphqlhttp) with [all options](https://github.com/graphql/express-graphql#options).
