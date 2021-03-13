import { useState }    from 'react';
import { addToCart }   from '../../redux/reducer'
import { useDispatch, useSelector } from 'react-redux'

import './Book.scss'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faShoppingCart }   from '@fortawesome/free-solid-svg-icons'

import Desc  from './Desc';
import Cover from './Cover';

const BookInStore = ({book}) => {
  const inCartCount = useSelector(state => state.cart.filter(x => x === book.id).length)
  const dispatch = useDispatch()
  const [quantity, changeQuantity] = useState(1)

  return (
    <li className="container">
      <Cover url={book.cover_url} id={book.id} />
      <Desc book={book} />
      <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center"}}>
        <div>
          <small>Liczba egzemplarzy: </small> 
          <input type="number" style={{"width": "30px"}} min="1" placeholder="1" 
          onChange={(e) => e.target.valueAsNumber ? changeQuantity(e.target.valueAsNumber) : changeQuantity(1) }></input>
        </div>

        {quantity && quantity < 1 && <small className="error">Błędna wartość</small>}
        <button className="button" onClick={() => quantity > 0 && dispatch(addToCart(book.id, quantity))} >
          Dodaj do koszyka<FontAwesomeIcon icon={faShoppingCart} className="fa-right"/>
        </button>

        {inCartCount > 0 && <small className="counter">{inCartCount} egz. w koszyku</small>}

      </div>
    </li>
  )
}

export default BookInStore