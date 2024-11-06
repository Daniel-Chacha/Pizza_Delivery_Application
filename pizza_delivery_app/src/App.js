import logo from './logo.svg';
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signup';


function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={ <LandingPage /> }></Route>
        <Route path='/signup'  element= { <SignUpPage /> } ></Route>
      </Routes>
    </Router>
   
   );
};

export default App;
