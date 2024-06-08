import React, { useEffect, useState, useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import AdminContext from '../../../../context/admin/admincontext';
import Approved_Student from './approved_student';
import './students.css'
import * as XLSX from 'xlsx';


const AdminStudentsTable = () => {
  const { getApprovedStudents, approvedStudents } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      await getApprovedStudents();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

    // Function to download Excel file
    const downloadExcel = () => {
      const ws = XLSX.utils.json_to_sheet(approvedStudents);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Approved Students");
  
      XLSX.writeFile(wb, "Approved_Students.xlsx");
    };

  return (
    <>
    {loading ? (
        <div className="loading">
                    <CircularProgress color="success" />
        </div>
      ) : (
        <>
        <Button onClick={downloadExcel} variant="success" style={{ marginBottom: '10px' }}>
        Download as Excel
      </Button>
    <Table striped bordered hover responsive className="">
      <thead>
        <tr className='sHeading' >
          <th className='sHeading' >Name</th>
          <th>Father's Name</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>CNIC</th>
          <th>Address</th>
          <th>Highest Qualification</th>
          <th>Subject</th>
          <th>Completion Year</th>
          <th>University / College</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
          {approvedStudents.map((item) => (
            <Approved_Student item={item} key={item._id} />
          ))}
      </tbody>
    </Table>
    </>
    )}
    </>
  );
};

export default AdminStudentsTable;
