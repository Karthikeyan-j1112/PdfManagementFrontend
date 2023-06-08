import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Users from './pages/Users';
import Register from './components/Register';
import { useAuthContext } from './hooks/useAuthContext';
import Login from './components/Login';
import Home from './pages/Home';

import Upload from './components/Upload'
import Search from './components/Search'
import PdfView from './components/PdfView';
import SideBar from './components/SideBar';
import Invite from './pages/Invite';

function App() {

  const { user } = useAuthContext()

  return (
    <div className="App" style={{ minHeight: '350px' }} >
      <Routes >
        <Route path='/users' element={!user ? <Users /> : <Navigate to='/' />} >
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
        <Route path='/' element={user ? <Home /> : <Navigate to='/users' />} >
          <Route index element={user ? <><Upload /><Search /></> : <Navigate to='/users' />} />
          <Route path='/pdfs/:id' element={user ? <><PdfView /><SideBar /></> : <Navigate to='/users' />} />
        </Route>
        <Route path='/pdf/invite/:inviteId/:fileId' element={<Invite />} />
      </Routes>
    </div>
  );
}

export default App;
