import {createAction} from 'redux-actions'
import {singerList} from '../spider/index'

export const getSingerListSuccess = createAction('GET_SINGER_LIST_SUCCESS')

export const getSingerListFailure = createAction('GET_SINGER_LIST_FAILURE')

export const startGetSingerList = createAction('START_GET_SINGER_LIST')

export const getSingerList = listData => {
  return async dispatch => {
    dispatch(startGetSingerList({fetching: true}))
    let data = await singerList(listData)
    dispatch(getSingerListSuccess(data))
  }
}
