import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import {
  Form,
  FormGroup,
  FormLabel,
  FormSelect,
  Button,
  Table,
  Modal,
} from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';
import toast, { Toaster } from 'react-hot-toast';

const AttendanceForm = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { courses, markAttendance, getAttendanceData } = useContext(AdminContext);

  const [data, setData] = useState({
    course: '',
    date: '',
    students: [],
    courseId: '',
    attendance: {},
  });

  const [allFieldsSelected, setAllFieldsSelected] = useState(false); // State to track if all fields are selected

  useEffect(() => {
    if (courses.length > 0) {
      setData((prevData) => ({
        ...prevData,
        course: courses[0].name,
        courseId: courses[0]._id,
        students: courses[0].students,
        attendance: courses[0].students.reduce((acc, student) => {
          acc[student._id] = { present: false, absent: false };
          return acc;
        }, {}),
      }));
    }
  }, [courses]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAttendanceData();
        setAttendanceData(data);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchData();
  }, [getAttendanceData]);

  useEffect(() => {
    // Check if all fields are selected
    const allSelected =
      data.course !== '' &&
      data.date !== '' &&
      data.students.length > 0 &&
      data.students.every(
        (student) =>
          data.attendance[student._id]?.present || data.attendance[student._id]?.absent
      );
    setAllFieldsSelected(allSelected);
  }, [data]);

  const successMsg = 'Attendance marked successfully' 
  const handleSubmit = (event) => {
    event.preventDefault();
    const attendanceList = Object.entries(data.attendance).map(([studentId, status]) => ({
      courseId: data.courseId,
      studentId,
      studentName: data.students.find((student) => student._id === studentId)?.name, // Get student name
      date: data.date,
      status: status.present ? 'present' : 'absent',
    }));
    markAttendance(attendanceList);
    toast.success(successMsg, { duration: 5000 });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'course') {
      const selectedCourse = courses.find((course) => course.name === value);
      setData({
        ...data,
        course: value,
        courseId: selectedCourse._id,
        students: selectedCourse.students,
        attendance: selectedCourse.students.reduce((acc, student) => {
          acc[student._id] = { present: false, absent: false };
          return acc;
        }, {}),
      });
    } else if (name === 'date') {
      setData({ ...data, date: value });
    }
  };

  const handleAttendanceChange = (studentId, type) => {
    setData((prevData) => ({
      ...prevData,
      attendance: {
        ...prevData.attendance,
        [studentId]: {
          present: type === 'present' ? !prevData.attendance[studentId].present : false,
          absent: type === 'absent' ? !prevData.attendance[studentId].absent : false,
        },
      },
    }));
  };

  const handleViewAttendance = () => {
    // Handle view attendance
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="course">Course</FormLabel>
          <FormSelect id="course" onChange={onChangeHandler} name="course" value={data.course}>
            {courses.length > 0 &&
              courses.map((course) => (
                <option
                  value={course?.name}
                  key={course?._id}
                  courseId={course?._id}
                >
                  {course?.name}
                </option>
              ))}
          </FormSelect>
        </FormGroup>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="dateTime">Date and Time</FormLabel>
          <Form.Control
            type="date"
            id="dateTime"
            onChange={onChangeHandler}
            name="date"
            value={data.date}
          />
        </FormGroup>
        {data.students.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Present</th>
                <th>Absent</th>
              </tr>
            </thead>
            <tbody>
              {data.students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.attendance[student._id]?.present}
                      onChange={() => handleAttendanceChange(student._id, 'present')}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={data.attendance[student._id]?.absent}
                      onChange={() => handleAttendanceChange(student._id, 'absent')}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            </Table>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="primary" type="submit" disabled={!allFieldsSelected}>
            Mark Attendance
          </Button>
          <Button variant="success" onClick={handleViewAttendance}>
            View Attendance
          </Button>
        </div>
      </Form>
      <Toaster />
    </div>
  );
};

export default AttendanceForm;
