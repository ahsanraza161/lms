import React, { useContext, useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import AuthContext from '../../../context/auth/authcontext';
import AdminContext from '../../../context/admin/admincontext'; // Import AdminContext
import { Toaster } from 'react-hot-toast';

function YourCourses() {
  const { GetCoursesOfStudent, studentcourses } = useContext(AuthContext);
  const { fetchMaterials, materials } = useContext(AdminContext); // Access fetchMaterials and materials from AdminContext
  const [selectedCourseMaterials, setSelectedCourseMaterials] = useState([]);
  const [showMaterialModal, setShowMaterialModal] = useState(false);

  useEffect(() => {
    GetCoursesOfStudent();
  }, []);

  const handleShowMaterials = (courseId) => {
    fetchMaterials(courseId); // Fetch materials for the selected course
    setShowMaterialModal(true);
  };

  return (
    <div className="container mt-3">
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Teacher</th>
            <th>Start Date</th>
            <th>Classes Days</th>
            <th>Total Days</th>
            <th>Material</th>
          </tr>
        </thead>
        <tbody>
          {studentcourses.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.teacher}</td>
              <td>{item.start_date}</td>
              <td>{item.classes_days}</td>
              <td>{item.total_days}</td>
              <td className="actionBtnStudent">
                <Button
                  variant="primary"
                  onClick={() => handleShowMaterials(item._id)}
                >
                  Show Materials
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={showMaterialModal}
        onHide={() => setShowMaterialModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Materials</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Attachment</th>
                <th>Tutorial Link</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material._id}>
                  <td>{material.title}</td>
                  <td>{material.date}</td>
                  <td>
                    {material.attachment ? (
                      <a
                        href={material.attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Attachment
                      </a>
                    ) : (
                      'No attachment'
                    )}
                  </td>
                  <td>{material.tutorialLink}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowMaterialModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster />
    </div>
  );
}

export default YourCourses;
