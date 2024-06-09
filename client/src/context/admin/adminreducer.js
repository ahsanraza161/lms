const AdminReducer = (state, action) => {
  switch (action.type) {
    case 'GET_ATTENDANCE_DATA':
      return {
        ...state,
        attendances: action.payload,
      };

    case 'ADD_MATERIAL':
      return {
        ...state,
        materials: [action.payload, ...state.materials],
      };

    case 'FETCH_MATERIALS':
      return {
        ...state,
        materials: action.payload, // Set fetched materials to the state
      };

    // Handle note actions (GET_NOTES, ADD_NOTE, EDIT_NOTE, DELETE_NOTE)

    case 'getnotes':
      return {
        ...state,
        notes: action.payload,
      };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          action.payload.updatedNote ? note._id === action.payload.id : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note._id !== action.payload),
      };

    // Handle student and faculty actions

    case 'getpendingstudents':
      return {
        ...state,
        pendingStudents: action.payload,
      };
    case 'getapprovedstudents':
      return {
        ...state,
        approvedStudents: action.payload,
      };
    case 'deletestudent':
      return {
        ...state,
        approvedStudents: state.approvedStudents.filter(
          (student) => student._id !== action.payload
        ),
      };
    case 'deletefaculty':
      return {
        ...state,
        faculties: state.faculties.filter(
          (faculty) => faculty._id !== action.payload
        ),
      };
    case 'approvestudent':
      return {
        ...state,
        pendingStudents: state.pendingStudents.filter(
          (student) => student._id !== action.payload
        ),
      };

    // Handle other actions (getcourses, deletecourse, addcourse, getFaculty, getCardData)

    case 'getcourses':
      return {
        ...state,
        courses: action.payload,
      };
    case 'deletestudentcourse':
      return {
        ...state,
        courses: state.courses.map((course) => ({
          ...course,
          students: course.students.filter(
            (student) => student._id !== action.payload
          ),
        })),
      };
    case 'deletecourse':
      return {
        ...state,
        courses: state.courses.filter(
          (course) => course._id !== action.payload
        ),
      };
    case 'addcourse':
      return {
        ...state,
        courses: [action.payload, ...state.courses],
      };
    case 'getFaculty':
      return {
        ...state,
        faculties: action.payload,
      };
    case 'getCardData':
      return {
        ...state,
        cardData: action.payload,
      };

    case 'setattendances':
      return {
        ...state,
        attendances: action.payload,
      };
    case 'setactivities':
      return {
        ...state,
        activities: action.payload,
      };

    // Default case (handles unknown actions)
    default:
      return state;
  }
};

export default AdminReducer;
