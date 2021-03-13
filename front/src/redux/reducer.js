import { loop, Cmd } from 'redux-loop';
import { idArrToList } from '../utils'

const GET_BOOKS             = "GET_BOOKS";
const GET_COVER             = "GET_COVER";
const ADD_TO_CART           = "ADD_TO_CART";
const DELETE_ONE_FROM_CART  = "DELETE_ONE_FROM_CART";
const DELETE_ALL_FROM_CART  = "DELETE_ALL_FROM_CART";
const POST_ORDER            = "POST_ORDER";

export const getBooks = () => ({type: GET_BOOKS})
export const getCover = (id) => ({type: GET_COVER, payload: {id}})
export const addToCart = (id, quantity=1) => ({type: ADD_TO_CART, payload: {id, quantity}})
export const deleteOneFromCart = (id) => ({type: DELETE_ONE_FROM_CART, payload: id})
export const deleteAllFromCart = (id) => ({type: DELETE_ALL_FROM_CART, payload: id})
export const postOrder = (formVal) => ({type: POST_ORDER, payload: {formVal}})

const fetchBooks = () => fetch('http://localhost:3001/api/book')
  .then(response => response.json())
  .then(data => data);

const fetchCover = (url) => fetch(url)
  .then(response => response.blob())
  .then(image => URL.createObjectURL(image));

const fetchPostOrder = (postData) => 
  fetch('http://localhost:3001/api/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
  .then(response => response.json())
  .then(data => data);


const cartReducer = (state, action) => {
  switch(action.type) {
    // GET BOOKS REDUCERS
    case GET_BOOKS:
      return loop(
        {...state, initStarted: true},
        Cmd.run(fetchBooks, {
          successActionCreator: (books) => ({type: 'BOOKS_FETCH_SUCCESSFUL', books}),
          failActionCreator:    (error) => ({type: 'BOOKS_FETCH_FAILED', error})
        })
      );
    case 'BOOKS_FETCH_SUCCESSFUL':
      return {...state, books: action.books.data};
    case 'BOOKS_FETCH_FAILED':
      return {...state, error: action.error};

    // GET COVER REDUCERS
    case GET_COVER:
      const book = state.books.find(x => x.id === action.payload.id)
      if (book) {
        return loop(
          {...state, initStarted: true},
          Cmd.run( () => fetchCover(book.cover_url), {
            successActionCreator: (cover) => ({type: 'COVER_FETCH_SUCCESSFUL', payload:{ cover: cover, id: book.id }}),
            failActionCreator:    (error) => ({type: 'COVER_FETCH_FAILED', error})
          })
        );
      } else {
        return state
      }
    case 'COVER_FETCH_SUCCESSFUL':
      const [id, cover] = [action.payload.id, action.payload.cover]
      const covers = state.covers
      covers[id] = cover
      return {...state, covers: covers};
    case 'COVER_FETCH_FAILED':
      return {...state, error: action.error};

    // POST ORDER REDUCERS
    case POST_ORDER:
      const order = idArrToList(state.cart, state.books).map(item => ({id: item.id, quantity: item.quantity}))
      const postData = {...action.payload.formVal, order}
      return loop(
        {...state, initStarted: true},
        Cmd.run( () => fetchPostOrder(postData), {
          successActionCreator: (data)  => ({type: 'POST_ORDER_SUCCESSFUL', data}),
          failActionCreator:    (error) => ({type: 'POST_ORDER_FAILED', error})
        })
      );
    case 'POST_ORDER_SUCCESSFUL':
      console.log("Data posted successfully:", action.data)
      return {...state, cart: []}
    case 'POST_ORDER_FAILED':
      return {...state, error: action.error};

    // CART REDUCERS
    case ADD_TO_CART:
      return {...state, cart: [...state.cart, ...[...Array(action.payload.quantity).keys()].map(() => action.payload.id) ]}
    case DELETE_ONE_FROM_CART:
      return {...state, cart: [
        ...state.cart.slice(0 , state.cart.indexOf(action.payload)), 
        ...state.cart.slice(1 + state.cart.indexOf(action.payload))
      ]}
    case DELETE_ALL_FROM_CART:
      return {...state, cart: state.cart.filter(id => id !== action.payload)}

    default:
      return state;
  }
}

export default cartReducer