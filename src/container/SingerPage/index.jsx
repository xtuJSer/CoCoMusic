import React, {Component} from 'react'
import { connect } from 'react-redux'

import './singerPage.styl'

const mapStateToProps = ({singer}) => ({singer})

@connect(mapStateToProps)
class SingerPage extends Component {
  render () {
    return (
      <div className='singerPage'>
        <div className='singer-image'>
          <img src={`http://y.gtimg.cn/music/photo_new/T001R150x150M000singerMid.jpg?max_age=2592000`} alt='' />
        </div>
      </div>
    )
  }
}
export default SingerPage
