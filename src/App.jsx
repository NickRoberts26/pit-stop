import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route index path="/" element={<HomePage /> } />
          <Route index path="/login" element={<Login /> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profile/:id' element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
