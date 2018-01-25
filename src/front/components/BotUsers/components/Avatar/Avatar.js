/* @flow */

import { type ComponentType } from 'react'

import omit from 'ramda/src/omit'
import styled from 'styled-jss'
import MUIAvatar from 'material-ui/Avatar/Avatar'

/* :: declare var lifecycle: (Object) => <V>(V) => V */

import {
  compose,
  pure,
  mapProps,
  withStateHandlers,
  defaultProps,
  // $FlowFixMe
  lifecycle,
} from 'recompose'

import defaultImage from './default.svg'

export const Avatar: ComponentType<{
  url: string,
  alt?: 'Bot avatar',
  defaultUrl?: string,
  onError?: Function,
}> = compose(
  pure,
  defaultProps({
    url: defaultImage,
    defaultUrl: defaultImage,
  }),
  withStateHandlers(props => ({
    src: props.url,
  }), {
    setUrl: () => (src: string) => ({ src }),
    onError: (state, { defaultUrl, onError }) => (payload) => {
      if (onError) onError(payload)
      return { src: defaultUrl }
    },
  }),
  lifecycle({
    componentWillReceiveProps({ url, setUrl }) {
      if (url !== this.props.url) setUrl(url)
    },
  }),
  mapProps(omit(['setUrl', 'defaultUrl'])),
)(styled(MUIAvatar)({
  width: 48,
  height: 48,
  background: '#eee',
}))
