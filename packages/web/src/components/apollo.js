import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

const client = new ApolloClient({
  link: ApolloLink.from(
    typeof window === 'undefined'
      ? []
      : [
        onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path }) =>
              console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
              )
            )
          }
          if (networkError) console.log(`[Network error]: ${networkError}`)
        }),
        new HttpLink({
          uri: window.__APOLLO_URL__
        })
      ]
  ),
  cache: new InMemoryCache()
})

export default client
