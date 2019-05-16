/* global db */

db.getSiblingDB('admin').auth('root', 'secret')

db.getSiblingDB('chat').createUser({
  user: 'admin',
  pwd: 'secret',
  roles: ['readWrite', 'dbAdmin']
})
