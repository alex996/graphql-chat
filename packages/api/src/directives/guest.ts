import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedOut } from '../auth'

class GuestDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition (field: any) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args: any) {
      const [, , context] = args

      ensureSignedOut(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default GuestDirective
