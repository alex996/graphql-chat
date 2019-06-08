import { RedisPubSub } from 'graphql-redis-subscriptions'
import Redis from 'ioredis'
import { REDIS_OPTIONS } from './config'

const pubsub = new RedisPubSub({
  publisher: new Redis(REDIS_OPTIONS),
  subscriber: new Redis(REDIS_OPTIONS)
})

export default pubsub
