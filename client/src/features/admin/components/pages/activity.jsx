import React, { useState, useEffect, useContext } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import AdminContext from '../../../../context/admin/admincontext';

const ActivityLog = () => {
  const { getActivity, activities } = useContext(AdminContext);

  const [showModal, setShowModal] = useState(false);
  const [selectedLog, setSelectedLog] = useState({});

  useEffect(() => {
    getActivity();
  }, []);

  const handleShowModal = (log) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>Activity Log</h1>
      <Table striped bordered hover>
        <thead style={{ textAlign: 'center' }}>
          <tr>
            <th>Date and Time</th>
            <th>Name</th>
            <th>Action</th>
            <th>of</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((log, index) => (
            <tr key={index}>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
              <td>{log.name}</td>
              <td>{log.action}</td>
              <td>{log.object}</td>
              <td>
                <Button variant="primary" onClick={() => handleShowModal(log)}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Activity Log Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Date:</strong>{' '}
            {new Date(selectedLog.timestamp).toLocaleString()}
          </p>
          <p>
            <strong>Name:</strong> {selectedLog.name}
          </p>
          <p>
            <strong>Action:</strong> {selectedLog.action}
          </p>
          <p>
            <strong>Object:</strong> {selectedLog.object}
          </p>
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

export default ActivityLog;
