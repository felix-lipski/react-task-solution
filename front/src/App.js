import { Route, BrowserRouter } from 'react-router-dom';
import { useEffect }    from 'react'
import { useDispatch }  from 'react-redux'
import { getBooks }     from "./redux/reducer";

import './style.scss';

import BookStore  from './components/BookStore';
import Cart       from './components/Cart';
import Nav        from './components/Nav';
import Order      from './components/Order';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  })

  return (
    <BrowserRouter>
    <div className="App">
    <Nav />
    <Route path="/" exact     component={BookStore} />
    <Route path="/ksiegarnia" component={BookStore} />
    <Route path="/koszyk"     component={Cart}      />
    <Route path="/zamowienie" component={Order}     />
    </div>
    </BrowserRouter>
  );
}

export default App;