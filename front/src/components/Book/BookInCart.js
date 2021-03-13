import { useDispatch } from 'react-redux'
import { deleteOneFromCart, addToCart, deleteAllFromCart } from '../../redux/reducer'

import './Book.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons'

import Desc  from './Desc';
import Cover from './Cover';

const BookInCart = ({book, quantity}) => {
  const dispatch = useDispatch()
  
  return (
    <li className="container">
      <Cover url={book.cover_url} id={book.id} />
      <Desc book={book} />
      <div>
        <div style={{"textAlign": "center"}}>
          <FontAwesomeIcon icon={faMinusSquare} className="plus-minus fa-left"  onClick={() => dispatch(deleteOneFromCart(book.id))}/>
          {quantity}
          <FontAwesomeIcon icon={faPlusSquare}  className="plus-minus fa-right" onClick={() => dispatch(addToCart(book.id))}/>
        </div>

        <button className="button" onClick={() => dispatch(deleteAllFromCart(book.id))} >
          Usuń<FontAwesomeIcon icon={faTimes} className="fa-right"/>
        </button>
      </div>
    </li>
  )
}

export default BookInCart