/* @flow */

type APIResponse<T> = {
  result: T,
  nextPageUrl?: string,
  previousPageUrl?: string,
}

type User = {
  id: string,
  name: string,
  avatarUrl: string,
}
