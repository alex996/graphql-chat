import graphqlFields from 'graphql-fields'
import { GraphQLResolveInfo } from 'graphql'

interface FieldsMap {
  [field: string]: {} | FieldsMap
}

const fieldsMap = (info: GraphQLResolveInfo): FieldsMap => {
  return graphqlFields(info, {}, { excludedFields: ['__typename'] })
}

const isEmpty = (obj: object): boolean => {
  return Object.getOwnPropertyNames(obj).length === 0
}

// Whether the info object contains any non-flat (i.e. nested) fields
export const hasSubfields = (info: GraphQLResolveInfo): boolean => {
  return Object.values(fieldsMap(info)).some(
    (subfields: object) => !isEmpty(subfields)
  )
}

// Space-separated fields as requested in the info object
export const fields = (info: GraphQLResolveInfo): string => {
  return Object.keys(fieldsMap(info)).join(' ')
}
