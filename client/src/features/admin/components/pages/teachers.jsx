import React, { useEffect, useContext, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx';
import AdminContext from '../../../../context/admin/admincontext';
import GetTeachers from './getTeachers.jsx';
import './students.css';

const AdminTeacherTable = () => {
  const { getAllFaculty, faculties } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);

  // Call API
  useEffect(() => {
    const fetchData = async () => {
      await getAllFaculty();
      setLoading(false); // Set loading to false after data is fetched
    };

    fetchData();
  }, []);

  // Function to download Excel file
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(faculties);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');

    XLSX.writeFile(wb, 'Teachers.xlsx');
  };

  return (
    <>
      {loading ? (
        <div className="loading">
          <CircularProgress color="success" />
        </div>
      ) : (
        <>
          <Button
            onClick={downloadExcel}
            variant="success"
            style={{ marginBottom: '10px' }}
          >
            Download as Excel
          </Button>
          <Table responsive striped bordered hover className="">
            <thead>
              <tr className="">
                <th>Name</th>
                <th>Father's Name</th>
                <th>Date of Birth</th>
                <th>Gender</th>
                <th>CNIC</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Subject</th>
                <th>Completion Year</th>
                <th>University/College</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {faculties.map((faculty) => (
                <GetTeachers key={faculty._id} item={faculty} />
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default AdminTeacherTable;
