import {handleActions} from 'redux-actions'

const defaultStatus = {
  fetching: false,
  list: [],
  totalPage: 0
}

export default handleActions({
  GET_SINGER_LIST_SUCCESS: (state, {payload}) => ({
    ...state, ...payload, fetching: false
  }),
  START_GET_SINGER_LIST: (state, {payload: {fetching}}) => ({
    ...state, fetching
  })
}, defaultStatus)
