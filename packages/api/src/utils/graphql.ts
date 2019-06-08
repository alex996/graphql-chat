import graphqlFields from 'graphql-fields'
import { GraphQLResolveInfo } from 'graphql'

const fieldsMap = (info: GraphQLResolveInfo): object => {
  return graphqlFields(info, {}, { excludedFields: ['__typename'] })
}

const isEmpty = (obj: object): boolean => {
  return Object.getOwnPropertyNames(obj).length === 0
}

export const hasSubfields = (info: GraphQLResolveInfo): boolean => {
  return Object.values(fieldsMap(info)).some(
    (subfields: object) => !isEmpty(subfields)
  )
}

export const fields = (info: GraphQLResolveInfo): string => {
  return Object.keys(fieldsMap(info)).join(' ')
}
