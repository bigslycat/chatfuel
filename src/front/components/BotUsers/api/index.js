/* @flow */

/* eslint-env node */

import axios, { type AxiosPromise } from 'axios'

import type {
  APIResponse,
  User,
} from './apiTypes'

export const client = axios.create({
  baseURL: process.env.API_URL || '//virtserver.swaggerhub.com/bigslycat/chatfuel/1.0.0',
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

const defaultLimit = 25

const getUsers: Get<User> = (...args): any => {
  if (typeof args[0] === 'string') return client.get(`users/${args[0]}`)

  const [terms] = args

  const [limit, offset]: [number | void, number | void] =
    (args: any).filter(arg => typeof arg === 'number')

  const params: Params = {
    limit: limit || defaultLimit,
  }

  if (offset != null) params.offset = offset
  if (typeof terms === 'object' && terms.name) params.name = terms.name

  return axios.get('users', { params })
}


export const users = {
  get: getUsers,
}
