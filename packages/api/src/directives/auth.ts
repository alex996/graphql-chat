import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'
import { ensureSignedIn } from '../auth'

class AuthDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition (field: any) {
    const { resolve = defaultFieldResolver } = field

    field.resolve = function (...args: any) {
      const [, , context] = args

      ensureSignedIn(context.req)

      return resolve.apply(this, args)
    }
  }
}

export default AuthDirective
