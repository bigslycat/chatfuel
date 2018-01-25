/* @flow */

/* eslint-env node */

import { create, type AxiosPromise } from 'axios'

import type {
  APIResponse,
  User,
} from './apiTypes'

export * from './apiTypes'

export const client = create({
  headers: {
    Accept: 'application/json',
  },
  baseURL: (process.env.API_URL: any),
})

type Get<T> = (
  (limit?: number, offset?: number) => AxiosPromise<APIResponse<T[]>>
) & (
  (terms: { name?: string }, limit?: number, offset?: number) => AxiosPromise<APIResponse<T[]>>
) & (
  (id: string, limit?: number, offset?: number) => AxiosPromise<APIResponse<T>>
)

type Params = {
  limit: number,
  offset?: number,
  name?: string,
}

const getUsers: Get<User> = (...args): any => {
  if (typeof args[0] === 'string') return client.get(`users/${args[0]}`)

  const [terms] = args

  const [limit = 25, offset = 0]: [number | void, number | void] =
    (args: any).filter(arg => typeof arg === 'number')

  const params: Params = { limit, offset }

  if (typeof terms === 'object' && terms.name) params.name = terms.name

  return client.get('users', { params })
}


export const users = {
  get: getUsers,
}
