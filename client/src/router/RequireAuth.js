import React, { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/authcontext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const {
    isAdminAuthenticated,
    isStudentAuthenticated,
    isTeacherAuthenticated,
    RefreshHandler,
  } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    RefreshHandler();
  }, [isAdminAuthenticated, isStudentAuthenticated, isTeacherAuthenticated]);

  if (location.pathname.includes('dashboard') && !isAdminAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('user') && !isStudentAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else if (location.pathname.includes('teacher') && !isTeacherAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
};

export default RequireAuth;
