import React, {Component} from 'react'
import './footer.styl'

class Footer extends Component {
  render () {
    return (
      <div className='footer'>
        <input type='range' />
        <div className='controler'>
          <div style={{'width': '40%'}}>
            <img className='album' src={require('../../assets/img/music.jpg')} alt='' />
            <div className='singInfo'>
              <span></span>
              <span></span>
            </div>
          </div>
          <div>
            <img className='playControler playControler-previous' src={require('../../assets/img/previous.svg')} alt='' />
            <img className='playControler playControler-player' src={require('../../assets/img/play3.svg')} alt='' />
            <img className='playControler playControler-next' src={require('../../assets/img/nextmusic.svg')} alt='' />
          </div>
          <div style={{'width': '40%'}}>
            <div className='play-time'>
              <span className='current'></span>
              <span className='total'></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Footer
