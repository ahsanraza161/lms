import React, { useContext, useEffect } from 'react';
import '../../global.css';
import Topbar from './common/topbar.jsx';
import { useParams } from 'react-router-dom';
import UserSidebar from './common/sidebar';
import AccountSettings from './pages/AccountSettings.jsx';
import '../student/student.css';
import AllNotes from './pages/allNotes.jsx';
import YourCourses from './pages/YourCourses';
import Dashboard from './pages/dashboard';
import AuthContext from '../../context/auth/authcontext';
const TeacherPanel = () => {
  const { activepage } = useParams();
  const { GetTeacherData } = useContext(AuthContext);

  useEffect(() => {
    GetTeacherData();
  }, []);
  return (
    <div className="userprofile">
      <Topbar />
      <div className="userprofilein">
        <div className="left">
          <UserSidebar activepage={activepage} />
        </div>
        <div className="right">
          {activepage === 'yourdashboard' && <Dashboard />}
          {activepage === 'allnotes' && <AllNotes />}
          {activepage === 'yourcourses' && <YourCourses />}
          {activepage === 'accountsettings' && <AccountSettings />}
        </div>
      </div>
    </div>
  );
};

export default TeacherPanel;
