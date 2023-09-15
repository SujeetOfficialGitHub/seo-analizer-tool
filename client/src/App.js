import './App.css';
import InputForm from './pages/inputForm/InputForm';
import AnalizedResult from './pages/analizedResult/AnalizedResult';
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<InputForm />} />
      <Route path='/report' element={<AnalizedResult />} />
    </Routes>
  );
}

export default App;
