/* @flow */

import React, { Fragment, type ComponentType } from 'react'
import {
  compose,
  pure,
  mapProps,
  withProps,
  defaultProps,
} from 'recompose'

import List, { ListItem, ListItemText } from 'material-ui/List'

import type { User as UserType } from '../../api'

import { User } from '../User'
import { Loader } from '../Loader'

type Props = {
  users: UserType[],
  loading?: bool,
}

export const UserList: ComponentType<Props> =
  compose(
    pure,
    defaultProps({
      loading: false,
    }),
    withProps(({ users, loading }) => ({
      users: users.length ? users.map(user => (
        <User key={user.id} {...user} />
      )) : (
        <ListItem>
          <ListItemText primary={loading ? 'Loading...' : 'No results'} />
        </ListItem>
      ),
    })),
    mapProps(({ users, loading, ...props }) => ({
      ...props,
      children: (
        <Fragment>
          {users}
          <Loader display={loading} overlay />
        </Fragment>
      ),
    })),
  )(List)

