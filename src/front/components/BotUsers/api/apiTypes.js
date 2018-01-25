/* @flow */

import type { $AxiosXHR } from 'axios'

export type { $AxiosXHR }

export type APIResponse<T> = {
  result: T,
  nextPageUrl?: string,
  previousPageUrl?: string,
}

export type User = {
  id: UserId,
  name: UserName,
  avatarUrl: UserAvatarUrl,
}

export opaque type UserId: string = string
export opaque type UserName: string = string
export opaque type UserAvatarUrl: string = string
