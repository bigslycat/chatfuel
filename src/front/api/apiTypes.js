/* @flow */

type APIResponse<T> = {
  result: T,
  nextPageUrl?: string,
  previousPageUrl?: string,
}

