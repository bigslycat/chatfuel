/* @flow */

import { type ComponentType } from 'react'

import styled from 'styled-jss'

/* :: declare var lifecycle: (Object) => <V>(V) => V */

import {
  compose,
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
)(styled('img')({
  margin: 0,
  padding: 0,
}))
