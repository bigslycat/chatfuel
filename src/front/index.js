/* @flow */

import React from 'react'
import { render } from 'react-dom'

import { BotUsers } from './components/BotUsers'

render(
  <BotUsers />,
  (document.getElementById('root'): any),
)

if (
  module.hot &&
  typeof module.hot.accept === 'function'
) module.hot.accept()
