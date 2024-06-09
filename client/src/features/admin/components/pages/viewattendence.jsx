import React, { useEffect, useContext, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import AdminContext from '../../../../context/admin/admincontext';

const ViewAttendance = () => {
  const { getAttendanceData, attendances } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentAttendanceDetails, setCurrentAttendanceDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getAttendanceData();
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAttendanceData]);

  function roundToSignificantDigits(num, digits) {
    if (num === 0) return 0;
    const d = Math.ceil(Math.log10(num < 0 ? -num : num));
    const power = digits - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return shifted / magnitude;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }

  function combineAttendancesByCourseAndStudent(attendances = []) {
    const combined = {};

    attendances.forEach((attendance) => {
      if (!attendance.course || !attendance.student) return;

      const courseId = attendance.course._id;
      const studentId = attendance.student._id;
      const key = `${courseId}_${studentId}`;

      if (!combined[key]) {
        combined[key] = {
          course: attendance.course,
          student: attendance.student,
          totalClasses: attendance.course.total_days, // Use total days from course
          totalPresent: 0,
          presentDates: [],
        };
      }

      if (attendance.status === 'present') {
        combined[key].totalPresent += 1;
        combined[key].presentDates.push(attendance.date);
      }
    });

    return Object.values(combined);
  }

  const combinedAttendances = combineAttendancesByCourseAndStudent(attendances);

  const handleShowDetails = (attendanceItem) => {
    setCurrentAttendanceDetails(attendanceItem.presentDates);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentAttendanceDetails([]);
  };

  if (loading) {
    return (
      <div className="container mt-5 d-flex justify-content-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Table striped bordered hover>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Total Classes</th>
            <th>Total Present</th>
            <th>Attendance Percentage</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedAttendances.map((attendanceItem) => (
            <tr key={`${attendanceItem.student._id}_${attendanceItem.course._id}`}>
              <td>{attendanceItem.student.name}</td>
              <td>{attendanceItem.course.name}</td>
              <td>{attendanceItem.totalClasses}</td>
              <td>{attendanceItem.totalPresent}</td>
              <td>
                {roundToSignificantDigits(
                  (attendanceItem.totalPresent / attendanceItem.totalClasses) * 100,
                  2
                )}
                %
              </td>
              <td>
                <Button variant="info" onClick={() => handleShowDetails(attendanceItem)}>
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Attendance Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Date and Time</th>
              </tr>
            </thead>
            <tbody>
              {currentAttendanceDetails.map((date, index) => (
                <tr key={index}>
                  <td>{formatDate(date)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewAttendance;
