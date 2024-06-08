import React, { useReducer } from 'react';
import AdminContext from './admincontext';
import AdminReducer from './adminreducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

const Adminstate = ({ children }) => {
  const initstate = {
    notes: [],
    pendingStudents: [],
    materials: [],
    approvedStudents: [],
    deleteFacultys: [],
    faculties: [],
    courses: [],
    attendances: [],
    cardData: {},
    activities: [],
    attendances: [],
    error: null,
  };

  const addMaterial = async (id, data) => {
    // Accept id as a parameter
    try {
      setAuthToken(localStorage.token);
      // console.log('context is working');
      const response = await axios.post(
        `https://lms2-two.vercel.app/api/materials/${id}/upload`, // Use id in the URL
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      dispatch({
        type: 'ADD_MATERIAL',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error:', error.message);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getMaterials = async (id) => {
    // Accept id as a parameter
    try {
      setAuthToken(localStorage.token);
      const response = await axios.get(
        `https://lms2-two.vercel.app/api/materials/${id}` // Use id in the URL
      );
      // console.log(id);
      // console.log('Materials data:', response.data);
      return response.data; // Return the materials data
    } catch (error) {
      console.error('Error:', error.message);
      throw new Error(error.message); // Throw the error for handling
    }
  };

  // In your component or context provider where you manage state and dispatch actions

  const fetchMaterials = async (id) => {
    try {
      const materials = await getMaterials(id);
      dispatch({
        type: 'FETCH_MATERIALS',
        payload: materials,
      });
    } catch (error) {
      console.error('Error fetching materials:', error.message);
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const getNotes = async () => {
    try {
      const response = await axios.get('https://lms2-two.vercel.app/api/note'); // Adjust the URL based on your backend
      dispatch({
        type: 'getnotes',
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
  const addNote = async (data) => {
    try {
      setAuthToken(localStorage.token);
      const response = await axios.post('https://lms2-two.vercel.app/api/note', data);

      dispatch({
        type: 'ADD_NOTE',
        payload: response.data,
      });
      // console.log(response.data);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const editNote = async (id, updatedNote) => {
    try {
      setAuthToken(localStorage.token);
      // console.log('Note ID:', id);
      const res = await axios.put(
        `https://lms2-two.vercel.app/api/note/${id}`,
        updatedNote
      );
      dispatch({
        type: 'EDIT_NOTE',
        payload: { id, updatedNote },
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  const deleteNote = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(`https://lms2-two.vercel.app/api/note/${id}`);

      dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  // Get pending students
  const getPendingStudents = async () => {
    try {
      setAuthToken(localStorage.token);
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const response = await axios.get(
        'https://lms2-two.vercel.app/api/admin/pending',
        config
      );
      dispatch({
        type: 'getpendingstudents',
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Get approved students
  const getApprovedStudents = async () => {
    try {
      setAuthToken(localStorage.token);
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const response = await axios.get(
        'https://lms2-two.vercel.app/api/admin/approved',
        config
      );
      dispatch({
        type: 'getapprovedstudents',
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Enroll student in Course
  const addStudentInCourse = async (studentId, courseId) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.post(
        'https://lms2-two.vercel.app/api/courses/addcourse',
        { studentId, courseId }
      );
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // approve student
  const approveHandler = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.patch(
        `https://lms2-two.vercel.app/api/admin/${id}`,
        config
      );
      dispatch({
        type: 'approvestudent',
        payload: id,
      });
    } catch (err) {
      console.error(err.response.data.message);
    }
  };

  // Delete Student
  const deleteStudent = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(`https://lms2-two.vercel.app/api/admin/${id}`);
      dispatch({
        type: 'deletestudent',
        payload: id,
      });
    } catch (err) {
      console.error(err);
    }
  };
  const deleteFaculty = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(
        `https://lms2-two.vercel.app/api/admin/teacher/${id}`
      );
      dispatch({
        type: 'deletefaculty',
        payload: id,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Add the getUserData function
  const getUserData = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const response = await axios.get(
        `https://lms2-two.vercel.app/api/user/${id}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Handle error appropriately, e.g., display an error message to the user
      return null; // Or return a custom error object
    }
  };
  // Add the getactivity function
  const getActivity = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await axios.get('https://lms2-two.vercel.app/api/activity');
      dispatch({
        type: 'setactivities',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching activity data:', error);
      return null; // Or return a custom error object
    }
  };

  // get all faculty
  const getAllFaculty = async () => {
    try {
      setAuthToken(localStorage.token);

      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/admin/getteacher',
        config
      );
      dispatch({
        type: 'getFaculty',
        payload: res.data,
      });
    } catch (err) {
      // console.log(err);
    }
  };
  // get all courses
  const getAllCourses = async () => {
    try {
      setAuthToken(localStorage.token);
      const config = {
        data: {
          'Content-type': 'application-json',
        },
      };
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/courses',
        config
      );
      dispatch({
        type: 'getcourses',
        payload: res.data,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  // Delete student Course
  const deleteStudentCourse = async (courseId, studentId) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(
        `https://lms2-two.vercel.app/api/courses/deletestudent/${courseId}/${studentId}`
      );
    } catch (err) {
      // console.log(err);
    }
  };
  // Delete Course
  const deleteCourse = async (id) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.delete(
        `https://lms2-two.vercel.app/api/courses/${id}`
      );
      // console.log(res.data);
      dispatch({
        type: 'deletecourse',
        payload: id,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  // Add Course
  const addCourse = async (data) => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.post('https://lms2-two.vercel.app/api/courses', data);
      dispatch({
        type: 'addcourse',
        payload: res.data,
      });
      // console.log(res.data);
    } catch (err) {
      // console.log(err.response.data);
    }
  };

  // Get Numbers
  const getNumbers = async () => {
    try {
      setAuthToken(localStorage.token);
      const res = await axios.get(
        'https://lms2-two.vercel.app/api/admin/getNumbers'
      );
      dispatch({
        type: 'getCardData',
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Mark attenddance
  const markAttendance = async (attendanceList) => {
    setAuthToken(localStorage.token);
    try {
      const res = await axios.post('https://lms2-two.vercel.app/api/attendance', {
        attendanceList,
      });
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Add the getAttendanceData function
  const getAttendanceData = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await axios.get('https://lms2-two.vercel.app/api/attendance');
      dispatch({
        type: 'setattendances',
        payload: response.data,
      });
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  const [state, dispatch] = useReducer(AdminReducer, initstate);

  return (
    <AdminContext.Provider
      value={{
        pendingStudents: state.pendingStudents,
        approvedStudents: state.approvedStudents,
        faculties: state.faculties,
        materials: state.materials,
        addMaterial,
        fetchMaterials,
        getNotes,
        addNote,
        editNote,
        deleteNote,
        getPendingStudents,
        getNumbers,
        approveHandler,
        getUserData,
        getActivity,
        getApprovedStudents,
        deleteStudent,
        getAllCourses,
        deleteStudentCourse,
        deleteCourse,
        addCourse,
        getAllFaculty,
        markAttendance,
        deleteFaculty,
        addStudentInCourse,
        getAttendanceData,
        courses: state.courses,
        faculties: state.faculties,
        cardData: state.cardData,
        notes: state.notes,
        attendances: state.attendances,
        activities: state.activities,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export default Adminstate;
