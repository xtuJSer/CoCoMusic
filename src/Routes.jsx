import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import React from 'react'
import OnlineSingerList from './container/OnlineSingerList'
import Titlebar from './components/titlebar'
import Setting from './container/Setting'
import Footer from './container/Footer'
import SingerPage from './container/SingerPage'

let Routes = function () {
  return (
    <BrowserRouter>
      <div className='app'>
        <Titlebar />
        <div className='container'>
          <Switch>
            <Redirect exact from='/' to='/OnlineSingerList/all_all/all/1' />
            <Route path='/OnlineSingerList/:country/:firstName/:page' component={OnlineSingerList} />
            <Route path='/Singer/:id' component={SingerPage} />
            <Route path='/Setting' component={Setting} />
          </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
export default Routes
