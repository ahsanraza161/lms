import React, { useContext } from 'react';
import './students.css'
import { Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const Approved_Student = ({ item }) => {
  if (!item) {
    // Render null or a placeholder if item is undefined
    return null;
  }

  const { deleteStudent } = useContext(AdminContext);
  const deleteStudentHandler = () => {
    deleteStudent(item._id);
  };

  return (
    <>
      <tr key={item._id}> 
        <td>{item.name}</td>
        <td>{item.fatherName}</td>
        <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
        {/* Format date */}
        <td>{item.gender}</td>
        <td>{item.cnic}</td>
        <td>{item.address}</td>
        <td>{item.qualification}</td>
        <td>{item.subject}</td>
        <td>{item.completionYear}</td>
        <td>{item.universityCollege}</td>
        <td>{item.email}</td>
        <td>
          <Button variant="danger" size="sm" onClick={deleteStudentHandler}>
            Delete {/* Replace with actual delete functionality */}
          </Button>
         
        </td>
      </tr>
    </>
  );
};

export default Approved_Student;
