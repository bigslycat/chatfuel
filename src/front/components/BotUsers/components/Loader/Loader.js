/* @flow */

import React, { type ComponentType } from 'react'
import styled from 'styled-jss'
import {
  compose,
  pure,
  componentFromProp,
  withProps,
} from 'recompose'

import CircularProgress from 'material-ui/Progress/CircularProgress'

type Props = {
  overlay?: bool,
  show?: bool,
}

const WithOverlay = withProps({
  children: <CircularProgress />,
})(styled('div')({
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(255, 255, 255, 0.5)',
  display: (props: Props) => (props.show ? 'flex' : 'none'),
  alignItems: 'center',
  justifyContent: 'center',
}))

const WithoutOverlay = styled(CircularProgress)({
  display: (props: Props) => (props.show ? 'inline-block' : 'none'),
})

export const Loader: ComponentType<Props> =
  compose(
    pure,
    withProps(props => ({
      component: props.overlay ? WithOverlay : WithoutOverlay,
    })),
  )(componentFromProp('component'))
