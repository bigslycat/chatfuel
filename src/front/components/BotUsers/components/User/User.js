/* @flow */

import React, { Fragment, type ComponentType } from 'react'
import {
  compose,
  pure,
  mapProps,
} from 'recompose'

import ListItem from 'material-ui/List/ListItem'
import ListItemIcon from 'material-ui/List/ListItemIcon'
import ListItemText from 'material-ui/List/ListItemText'

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
