import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import Stoplight from '../stoplight'
import './titlebar.styl'

class Titilebar extends Component {
  render () {
    return (
      <header className='navbar titlebar'>

        <section className='navbar-section'>
          <ul className='tab tab-block'>
            <li className='tab-item'>
              <NavLink to='/Setting'>
                <img alt='' src={require('../../assets/img/setting.svg')} />
              </NavLink>
            </li>
            <li className='tab-item'>
              <NavLink to='/favorite'>
                <img alt='' src={require('../../assets/img/favorite2.svg')} />
              </NavLink>
            </li>
            <li className='tab-item'>
              <NavLink to='/search'>
                <img alt='' src={require('../../assets/img/search.svg')} />
              </NavLink>
            </li>
            <li className='tab-item'>
              <NavLink to='/OnlineSingerList/all_all/all/1'>
                <img alt='' src={require('../../assets/img/music4.svg')} />
              </NavLink>
            </li>
            <li className='tab-item'>
              <NavLink to='/singlist'>
                <img alt='' src={require('../../assets/img/我的歌单.svg')} />
              </NavLink>
            </li>
          </ul>
        </section>

        <section className='navbar-center'>
          <p>CocoMusic</p>
        </section>
        <section className='navbar-section'>
          <Stoplight />
        </section>
      </header>
    )
  }
}

export default Titilebar
