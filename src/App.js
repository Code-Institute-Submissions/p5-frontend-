import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route,Routes} from 'react-router-dom';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';

function App() {
  return (
    <div className={styles.App}>
      <NavBar/>
      <Container className={styles.Main}>
        <Routes>
          <Route  path='/' element={<h1>Home page</h1>}/>
          <Route  path='/signin' element={<SignInForm/>}/>
          <Route  path='/register' element={<RegisterForm/>}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
