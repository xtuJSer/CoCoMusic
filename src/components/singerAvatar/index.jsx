import React from 'react'
import './singerAvatar.styl'

export default ({ singerName, singerMid }) => {
  let defaultErrorImg = (event) => {
    event.target.src = 'https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=2592000'
  }
  return (
    <div className='singerAvastar'>
      <img onError={defaultErrorImg} src={`http://y.gtimg.cn/music/photo_new/T001R150x150M000${singerMid}.jpg?max_age=2592000`} alt='' />
      <p>{singerName}</p>
    </div>
  )
}
