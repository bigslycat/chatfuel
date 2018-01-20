/* @flow */

import React from 'react'
import { render } from 'react-dom'

render(
  <div>OLOLO</div>,
  (document.getElementById('root'): any),
)

if (
  module.hot &&
  typeof module.hot.accept === 'function'
) module.hot.accept()
