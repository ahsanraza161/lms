import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import AdminContext from '../../../../context/admin/admincontext';

const ViewAttendance = () => {
  const { getAttendanceData, attendances } = useContext(AdminContext);

  useEffect(() => {
    getAttendanceData();
  }, []);

  function roundToSignificantDigits(num, digits) {
    if (num === 0) return 0;
    const d = Math.ceil(Math.log10(num < 0 ? -num : num));
    const power = digits - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return shifted / magnitude;
  }

  function combineAttendancesByCourseAndStudent(attendances) {
    const combined = {};

    attendances.forEach((attendance) => {
      const courseId = attendance.course._id;
      const studentId = attendance.student._id;

      const key = `${courseId}_${studentId}`;

      if (!combined[key]) {
        combined[key] = {
          course: attendance.course,
          student: attendance.student,
          totalClasses: 0,
          attendances: [],
        };
      }

      combined[key].totalClasses += 1;
      combined[key].attendances.push({
        date: attendance.date,
        status: attendance.status,
      });
    });

    return Object.values(combined);
  }

  // Usage
  const combinedAttendances = combineAttendancesByCourseAndStudent(attendances);

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
            <tr key={attendanceItem._id}>
              <td>{attendanceItem?.student.name}</td>
              <td>{attendanceItem?.course.name}</td>
              <td>{attendanceItem?.course.total_days}</td>
              <td>{attendanceItem?.totalClasses}</td>
              <td>
                {roundToSignificantDigits(attendanceItem?.totalClasses /
                  attendanceItem?.course.total_days,2)}
                %
              </td>
              <td>
                <Button variant="info">Edit</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ViewAttendance;
