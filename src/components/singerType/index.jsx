import React, {Component} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {COUNTRYLIST, FIRSTNAMELIST} from './singerTypeList'
import './singerType.styl'

@withRouter
class SingerType extends Component {
  render () {
    return (
      <div className='singer-type-list'>
        <div className='singer-country'>
          {
            Object.keys(COUNTRYLIST).map(country => {
              return <NavLink to={`/OnlineSingerList/${COUNTRYLIST[country]}/${this.props.match.params.firstName}/1`} key={COUNTRYLIST[country]}>
                <p>{country}</p>
              </NavLink>
            })
          }
        </div>
        <div className='singer-firstname'>
          {
            Object.keys(FIRSTNAMELIST).map(firstName => {
              return <NavLink to={`/OnlineSingerList/${this.props.match.params.country}/${FIRSTNAMELIST[firstName]}/1`} key={FIRSTNAMELIST[firstName]}>
                <p>{firstName}</p>
              </NavLink>
            })
          }
        </div>
      </div>
    )
  }
}
export default SingerType
