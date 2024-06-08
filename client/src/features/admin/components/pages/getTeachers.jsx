import React, { useContext } from 'react';
import './students.css';
import { Button } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const getTeachers = ({ item }) => {
  const { deleteFaculty } = useContext(AdminContext);
  const deletehandler = (id) => {
    deleteFaculty(id);
  };
  
  return (
    <>
      <tr key={item._id}>
        <td>{item.name}</td>
        <td>{item.fatherName}</td>
        <td>{new Date(item.dateOfBirth).toLocaleDateString()}</td>
        <td>{item.gender}</td>
        <td>{item.cnic}</td>
        <td>{item.address}</td>
        <td>{item.qualification}</td>
        <td>{item.subject}</td>
        <td>{item.completionYear}</td>
        <td>{item.universityCollege}</td>
        <td>{item.email}</td>
        <td>
          <Button
            variant="danger"
            size="sm"
            onClick={() => deletehandler(item._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};

export default getTeachers;
