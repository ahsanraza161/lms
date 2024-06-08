import React from 'react';
import '../global.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import RequireAuth from './RequireAuth';
import defaultRoutes from './routes';
import Admindashboard from '../features/admin/index';
import Dashboard from '../features/admin/components/pages/dashboard';
import Student from '../features/admin/components/pages/students';
import Teacher from '../features/admin/components/pages/teachers';
import Usermanagement from '../features/admin/components/pages/pending-registration';
import AddUser from '../features/admin/components/pages/adduser';
import Attendence from '../features/admin/components/pages/Attendence';
import ViewAttendence from '../features/admin/components/pages/viewattendence';
import Courses from '../features/admin/components/pages/courses';
import Activity from '../features/admin/components/pages/activity';
import AllNotes from '../features/admin/components/pages/allNotes';
import StudentPanel from '../features/student';
import TeacherPanel from '../features/teacher';

const AppRouter = () => {
  const { publicRoutes } = defaultRoutes;

  const publicPageRoutes = publicRoutes.map(({ label, path, component }) => {
    return <Route key={label} path={`/${path}`} element={component} />;
  });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {publicPageRoutes}


        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Admindashboard />}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<Student />} />
            <Route path="faculties" element={<Teacher />} />
            <Route path="pendingregistrations" element={<Usermanagement />} />
            <Route path="newregistration" element={<AddUser />} />
            <Route path="courses" element={<Courses />} />
            <Route path="attendence" element={<Attendence />} />
            <Route path="viewattendence" element={<ViewAttendence />} />
            {/* <Route path="shedulecalender" element={<Calender />} /> */}
            <Route path="activity" element={<Activity />} />
            <Route path="allnotes" element={<AllNotes />} />
          </Route>
          <Route path="/user/:activepage" element={<StudentPanel />} />

          <Route path="/teacher/:activepage" element={<TeacherPanel />} />
        </Route>
        <Route path="*" element={<h1 className="notfound">Not found</h1>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
