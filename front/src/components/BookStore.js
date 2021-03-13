import { useEffect }   from 'react'
import { useSelector } from 'react-redux'

import './Books.scss';

import BookInStore from './Book/BookInStore';

const BookStore = (props) => {
  useEffect(() => {document.title = "Księgarnia"});
  
  const books = useSelector(state => state.books)

  return (
    <div>
      <ul className="books">
        {books && books.map((book) => <BookInStore book={book} key={book.id}/>)}
      </ul>
    </div>
  )
}

export default BookStore