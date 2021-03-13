import { insertCommaInPrice, currencyToSymbol } from '../../utils'

const Desc = ({book}) => 
  <div className="desc">
    <h4>{book.title}</h4>
    <small>Autor: {book.author}</small>
    <p>{book.pages} stron</p>
    <small>Cena: {insertCommaInPrice(book.price.toString())} {currencyToSymbol[book.currency]}</small>
  </div>

export default Desc