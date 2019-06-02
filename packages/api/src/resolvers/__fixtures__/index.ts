// TODO: Consider using faker

export const alex = {
  name: 'Alex',
  username: 'alex',
  email: 'alex@gmail.com',
  password: 'Secret12'
}

export const max = {
  name: 'Max',
  username: 'max',
  email: 'max@gmail.com',
  password: 'Password12'
}

export const users = ['Mark', 'Jane', 'Rick'].map(name => ({
  name: name,
  username: name,
  email: `${name}@example.com`,
  password: 'Password12'
}))
