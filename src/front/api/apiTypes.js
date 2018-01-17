/* @flow */

export type APIResponse<T> = {
  result: T,
  nextPageUrl?: string,
  previousPageUrl?: string,
}

export type User = {
  id: string,
  name: string,
  avatarUrl: string,
}
