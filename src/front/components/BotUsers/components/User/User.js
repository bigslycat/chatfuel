/* @flow */

import React, { Fragment, type ComponentType } from 'react'
import {
  compose,
  pure,
  mapProps,
} from 'recompose'

import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'

import type { User as UserType } from '../../api'

import { Avatar } from '../Avatar'

export const User: ComponentType<UserType> =
  compose(
    pure,
    mapProps(({ name, avatarUrl, ...props }) => ({
      ...props,
      children: (
        <Fragment>
          <ListItemIcon>
            <Avatar url={avatarUrl} />
          </ListItemIcon>
          <ListItemText primary={name} />
        </Fragment>
      ),
    })),
  )(ListItem)
