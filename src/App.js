import './App.css';
import { FaTimes } from 'react-icons/fa'
import Header from './components/Header'
import Loader from './components/Loader'
import SearchForm from './components/SearchForm'
import SearchIndicator from './components/SearchIndicator'

function App() {
  return (
    <div className="App">
      <Loader />
      <SearchForm />
      <SearchIndicator />
    </div>
  );
}

export default App;
