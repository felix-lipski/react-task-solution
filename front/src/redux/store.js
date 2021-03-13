import { createStore, compose} from 'redux';
import { install, combineReducers  } from 'redux-loop';
import reducer from './reducer.js';
// import bookReducer from './bookReducer.js';

// const rootReducer = combineReducers({cartReducer, bookReducer})

const enhancer = compose(
  install()
);

const initialState = {
  initStarted: false,
  books: null,
  cart: [],
  covers: {},
  error: null,
  postResult: null
};

const store = createStore(reducer, initialState, enhancer);

export default store;