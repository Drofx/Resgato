import './App.css';
import Login from './pages/login'
import { AuthProvider } from './context/auth-context';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import AdminRouters from './routers/admin-routers';

function App() {

  return (
    <Router>
      <AuthProvider>
        <ToastContainer />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/*" element={<AdminRouters/>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;