import { useEffect }        from 'react'
import { useSelector }      from 'react-redux'
import { Link }             from 'react-router-dom';
import { insertCommaInPrice, sumPrices, idArrToList, currencyToSymbol } from '../utils'

import './Books.scss';
import './Cart.scss';
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faChevronRight }   from '@fortawesome/free-solid-svg-icons'

import BookInCart from './Book/BookInCart';

const Cart = () => {
  useEffect(() => {document.title = "Koszyk"})

  const books = useSelector(state => state.books)
  const cart  = useSelector(state => state.cart)

  return (
    <div>
      {(books && cart.length > 0) ? 
      <div className="cart">
        <h1>Koszyk</h1>

        <ul className="books">   
          {idArrToList(cart, books).map(item => <BookInCart book={item} quantity={item.quantity} key={item.id}/>)}
        </ul>

        <p>Razem: { insertCommaInPrice(String(sumPrices(cart, books)))} {currencyToSymbol[books[0].currency]}</p>
        
        <div className="next">
          <Link to="/zamowienie"> <button>Dalej<FontAwesomeIcon icon={faChevronRight} className="fa-right"/></button> </Link>
        </div>
      </div> 
      :
      <h1 className="no-cart">Twój koszyk jest pusty</h1>
      }
    </div>
  )
}

export default Cart