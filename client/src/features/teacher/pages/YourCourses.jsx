import React, { useContext, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

import '../../../global.css';
import AuthContext from '../../../context/auth/authcontext';

function YourCourses() {
  const { teacher_course } = useContext(AuthContext);

  return (
    <div className="container mt-3">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Start Date</th>
            <th>Clases date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{teacher_course?.name}</td>
            <td>{teacher_course?.start_date}</td>
            <td>{teacher_course?.classes_days}</td>
            <td className="actionBtnStudent">
              <Button variant="primary">Show detail</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default YourCourses;
