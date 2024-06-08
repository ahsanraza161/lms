import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  REGISTER_SUCCESS,
  CLEAR_ERROR,
  CLEAR_MSG,
} from '../type';
const Authreducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      // Assuming the payload contains userType
      const { usertype, token } = action.payload;
      localStorage.setItem('token', token);
      localStorage.setItem('role', usertype);
      let isAuthenticated = '';
      if (usertype === 'Student') {
        isAuthenticated = 'isStudentAuthenticated';
      } else if (usertype === 'Faculty') {
        isAuthenticated = 'isTeacherAuthenticated';
      } else if (usertype === 'admin') {
        isAuthenticated = 'isAdminAuthenticated';
      }
      return {
        ...state,
        [isAuthenticated]: true,
        token,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    case CLEAR_MSG:
      return {
        ...state,
        message: null,
      };
    case 'getuserdata':
      return {
        ...state,
        data: action.payload,
      };
    case 'updateuser':
      return {
        ...state,
        data: action.payload,
      };
    case 'refresh':
      const token2 = localStorage.getItem('token');
      const role = localStorage.getItem('role');
      let isAdminAuthenticated = false;
      let isStudentAuthenticated = false;
      let isTeacherAuthenticated = false;
      if (token2 && role == 'admin') {
        // console.log("This condition run");
        isAdminAuthenticated = true
      }
      else if (token2 && role == 'Student') {
        // console.log("This condition run");
        isStudentAuthenticated = true
      }
      else if (token2 && role == 'Faculty') {
        // console.log('This condition run')
        isTeacherAuthenticated = true
      }
      return {
        ...state,
        isAdminAuthenticated,
        isStudentAuthenticated,
        isTeacherAuthenticated,
      };
    case 'logout':
      localStorage.removeItem('token');
      const isAuthenticated1 = action.payload;
      return {
        ...state,
        data: null,
        token: null,
        studentcourses: [],
        [isAuthenticated1]: false,
      };
    case 'getcoursesofstudents':
      return {
        ...state,
        studentcourses: action.payload,
      };
    case 'setteacherdata':
      return {
        ...state,
        data:action.payload.user,
        teacher_course:action.payload.course
      }
    default:
      return { state };
  }
};
export default Authreducer;
