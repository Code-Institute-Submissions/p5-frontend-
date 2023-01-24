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
import ListsPage from './pages/todolist/ListsPage';
import { useCurrentUser } from './contexts/CurrentUserContext';
import EditListForm from './pages/todolist/EditListForm';

function App() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || '';

  return (
        <div className={styles.App}>
          <NavBar/>
          <Container className={styles.Main}>
            <Routes>
              <Route path='/' element={<ListsPage message='No results found, adjust the keyword'/> }/>
              <Route path='/feed' element={<ListsPage 
                message='No results found, Create a new list'
                filter={`owner__profile=${profile_id}&`}/> }/>
              <Route path='/signin' element={<SignInForm/>}/>
              <Route path='/register' element={<RegisterForm/>}/>
              <Route path='/lists/create' element={<CreateListForm/>}/>
              <Route path='/create/item' element={<CreateItemForm/>}/>
              <Route path='/lists/:id' element={<ListDetailPage/>}/>
              <Route path='/lists/:id/edit' element={<EditListForm/>}/>
              <Route path='*' element={<h1>Page not found :(</h1>}/>
            </Routes>
          </Container>
        </div>
  );
}

export default App;
