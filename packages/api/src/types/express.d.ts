import { Request as ExpressRequest, Response as ExpressResponse } from 'express'

export type Request = ExpressRequest & {
  session: Express.Session
}

export type Response = ExpressResponse
