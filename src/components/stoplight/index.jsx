import React, {Component} from 'react'
import './stoplight.styl'

import {remote} from 'electron'

class Stoplight extends Component {
  render () {
    return (
      <div className='titlebar-stoplight'>
        <div className='titlebar-close' onClick={() => remote.getCurrentWindow().close()}>
          <svg x='0px' y='0px' viewBox='0 0 6.4 6.4' >
            <polygon fill='#4d0000' points='6.4,0.8 5.6,0 3.2,2.4 0.8,0 0,0.8 2.4,3.2 0,5.6 0.8,6.4 3.2,4 5.6,6.4 6.4,5.6 4,3.2' />
          </svg>
        </div>

        <div className='titlebar-fullscreen' onClick={() => remote.getCurrentWindow().isMaximized() ? remote.getCurrentWindow().unmaximize() : remote.getCurrentWindow().maximize()}>
          <svg x='0px' y='0px' viewBox='0 0 6 5.9'>
            <path fill='#006400' d='M5.4,0h-4L6,4.5V0.6C5.7,0.6,5.3,0.3,5.4,0z' />
            <path fill='#006400' d='M0.6,5.9h4L0,1.4l0,3.9C0.3,5.3,0.6,5.6,0.6,5.9z' />
          </svg>
        </div>

        <div className='titlebar-minimize' onClick={() => remote.getCurrentWindow().minimize()}>
          <svg x='0px' y='0px' viewBox='0 0 8 1.1'>
            <rect fill='#995700' width='8' height='1.1' />
          </svg>
        </div>

      </div>)
  }
}
export default Stoplight
