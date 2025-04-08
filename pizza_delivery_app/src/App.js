
import { BrowserRouter as Router , Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/landingPage';
import SignUpPage from './pages/signup';
import SignInPage from './pages/signin';
import Dashboard from './pages/dashboard';
import Admin from './pages/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route  path='/' element={ <LandingPage /> }></Route>
        <Route path='/signup'  element= { <SignUpPage /> } ></Route>
        <Route path='/signin'  element= { <SignInPage /> } ></Route>
        <Route path='/dashboard'  element={<Dashboard  />} ></Route>
        <Route path='/admin'  element={<Admin />}></Route>
      </Routes>
    </Router>
   
   );
};

export default App;
