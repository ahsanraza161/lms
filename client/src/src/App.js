import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import About from './components/pages/about';
import Home from './components/pages/home';
import ForgetPassword from './components/pages/forgetpassword';
import Registration from './components/pages/Registration';
import Login from './components/pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Authstate from './context/auth/authstate';
import Adminstate from './context/admin/adminstate';
import Admindashboard from './features/admin';
import Dashboard from './features/admin/components/pages/dashboard';
import Student from './features/admin/components/pages/students';
import Usermanagement from './features/admin/components/pages/pending-registration';
import AddUser from './features/admin/components/pages/adduser';
import Courses from './features/admin/components/pages/courses';
import StudentPanel from './features/student';
import TeacherPanel from './features/teacher';
import AppRouter from './router';

function App() {
  return (
    <Authstate>
      <Adminstate>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Adminstate>
    </Authstate>
  );
}

export default App;
