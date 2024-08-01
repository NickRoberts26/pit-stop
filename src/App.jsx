import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignUp from './components/SignUp';
import Login from './components/Login';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { ToastContainer } from 'react-toastify';

function App() {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route index path="/dashboard" element={<HomePage /> } />
          <Route path="/signup" element={<SignUp />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App
