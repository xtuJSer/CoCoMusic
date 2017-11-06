import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SingerType from '../../components/singerType'
import {getSingerList} from '../../actions/singerList'
import SingerAvatar from '../../components/singerAvatar'
import './OnlineSingerList.styl'

const mapStateToProps = ({singerList}) => ({singerList})

@connect(mapStateToProps)
class OnlineSingerList extends Component {
  componentWillMount () {
    this.props.dispatch(getSingerList({type: 'all_all', name: 'all', page: 1}))
  }
  componentWillReceiveProps ({match, match: {params}}) {
    if (this.props.match.url !== match.url) {
      this.props.dispatch(getSingerList({
        type: params.country,
        name: params.firstName,
        page: params.page
      }))
    }
  }

  render () {
    let {singerList} = this.props
    return (
      <div className='singer-list'>
        <SingerType />
        <div className='singer-avatar-list' style={{
          opacity: singerList.fetching ? '0' : '1'
        }} >
          {
            singerList.list.map(singer => {
              return (
                <Link to={`/Singer/${singer.singerMid}`} key={singer.singerMid} >
                  <SingerAvatar {...singer} />
                </Link>
              )
            })
          }
        </div>
        <div className='loading loading-lg' style={{display: singerList.fetching ? 'block' : 'none'}} />
      </div>
    )
  }
}

export default OnlineSingerList
