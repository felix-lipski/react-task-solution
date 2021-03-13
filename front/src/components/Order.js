import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Link }      from 'react-router-dom'
import { useFormik } from 'formik'
import { postOrder } from "../redux/reducer";
import { sumPrices, insertCommaInPrice, idArrToList, currencyToSymbol } from '../utils'

import './Order.scss'
import { FontAwesomeIcon }  from '@fortawesome/react-fontawesome'
import { faChevronLeft }    from '@fortawesome/free-solid-svg-icons'

const initialValues = {first_name: '', last_name: '', city: '', zip_code: ''}
const validate = values => {
  const errors = {};
  (values.first_name.length < 4 ) && (errors.first_name = 'Podane imię jest za krótkie');
  (values.first_name.length > 50) && (errors.first_name = 'Podane imię jest za długie' );
  (values.last_name.length  < 5 ) && (errors.last_name  = 'Podane nazwisko jest za krótkie');
  (values.last_name.length  > 50) && (errors.last_name  = 'Podane nazwisko jest za długie' );
  !(/^\d{2}-\d{3}$/.test(values.zip_code)) && (errors.zip_code = 'Proszę wprowadzić poprawny kod pocztowy');
  Object.keys(initialValues).map((x) => (!values[x] && (errors[x] = 'Pole wymagane')));
  return errors
}

const field = (label, name, formik) => <>
  <label htmlFor={name}>{label}</label>
  <input type='text' id={name} name={name} {...formik.getFieldProps(name)}/>
  {formik.touched[name] && formik.errors[name] && <small className="error"> {formik.errors[name]}</small>}
</>

const Order = () => {
  useEffect(() => {document.title = "Zamówienie"})

  const dispatch = useDispatch()
  const onSubmit = values => {dispatch(postOrder(values))}
  const formik   = useFormik({initialValues, onSubmit, validate})
  const books    = useSelector(state => state.books)
  const cart     = useSelector(state => state.cart)

  return (
    <div className="order">
      {(books && cart.length > 0) ? <>
        <Link to="/koszyk"> <button><FontAwesomeIcon className="fa-left" icon={faChevronLeft}/>Powrót do koszyka</button> </Link>
        <ul className="review">
          Podsumowanie:
          {idArrToList(cart, books).map(item => <li key={item.id}>
            {item.quantity} x {item.title} - {insertCommaInPrice(String(item.price*item.quantity))} {currencyToSymbol[item.currency]}
          </li>)}
          Razem: { insertCommaInPrice(String(sumPrices(cart, books))) } {currencyToSymbol[books[0].currency]}
        </ul>
        <form onSubmit={formik.handleSubmit}>
          {field('Imię',          'first_name', formik)}
          {field('Nazwisko',      'last_name',  formik)}
          {field('Miejscowość',   'city',       formik)}
          {field('Kod pocztowy',  'zip_code',   formik)}
          <button type='submit'>Zamawiam i płacę</button>
        </form>
      </>
      :
      <h1>
      Dziękujemy za zakupy!
      </h1>
      }
    </div>
  )
}

export default Order
