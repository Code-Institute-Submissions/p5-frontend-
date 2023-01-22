import styles from './App.module.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import {Route,Routes} from 'react-router-dom';
import './api/axiosDefaults';
import RegisterForm from './pages/auth/RegisterForm';
import SignInForm from './pages/auth/SignInForm';
import CreateListForm from './pages/todolist/CreateListForm';
import CreateItemForm from './pages/todoitem/CreateItemForm';
import ListDetailPage from './pages/todolist/ListDetailPage';

function App() {
  return (
        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Routes>
              <Route path='/' element={<h1>Home page</h1>}/>
              <Route path='/signin' element={<SignInForm/>}/>
              <Route path='/register' element={<RegisterForm/>}/>
              <Route path='/createlist' element={<CreateListForm/>}/>
              {/* <Route path='/createitem' element={<CreateItemForm/>}/> */}
              <Route path='/lists/:id' element={<ListDetailPage/>}/>
              <Route path='*' element={<h1>Page not found :(</h1>}/>
            </Routes>
          </Container>
        </div>
  );
}

export default App;
