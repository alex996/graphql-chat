import graphqlFields from 'graphql-fields'
import { GraphQLResolveInfo } from 'graphql'

export const fields = (info: GraphQLResolveInfo) => {
  const fields = graphqlFields(info, {}, { excludedFields: ['__typename'] })
  return Object.keys(fields).join(' ')
}
