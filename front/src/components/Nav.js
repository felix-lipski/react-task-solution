import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import './Nav.scss'
import { FontAwesomeIcon }        from '@fortawesome/react-fontawesome'
import { faShoppingCart, faBook } from '@fortawesome/free-solid-svg-icons'

const Nav = () => {
  const cart  = useSelector(state => state.cart)

  return (
    <header><nav><ul>

    <Link to="/ksiegarnia"><li>
    Księgarnia<FontAwesomeIcon icon={faBook} className="fa-right"/>
    </li></Link>

    <Link to="/koszyk"><li>
    Koszyk<FontAwesomeIcon icon={faShoppingCart} className="fa-right"/>
    {cart.length > 0 && <small> {cart.length} </small>}
    </li></Link>

    </ul></nav></header>
  )
}

export default Nav