import React, { useContext, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import '../../mainadmin.css';
import AdminContext from '../../../../context/admin/admincontext';

const Pending_student = ({
  name,
  usertype,
  id,
  email,
  fatherName,
  dateOfBirth,
  qualification,
  gender,
}) => {
  const { approveHandler, getUserData } = useContext(AdminContext);
  const [showUserDataModal, setShowUserDataModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [initialLoad, setInitialLoad] = useState(true); // Flag for initial render

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUserData = await getUserData(id);
      setUserData(fetchedUserData);
    };

    // Fetch data only on initial render or when modal opens with new ID
    if (initialLoad || (userData && userData.id !== id)) {
      fetchData();
      setInitialLoad(false); // Reset flag after initial fetch
    }
  }, [id, getUserData, initialLoad, userData]); // Dependency array

  const onApproveHandler = () => {
    approveHandler(id);
  };

  const handleShowUserDataModal = () => {
    setShowUserDataModal(true);
  };

  const handleCloseUserDataModal = () => setShowUserDataModal(false);

  return (
    <>
            <tr>
              <td>{name}</td>
              <td>{email}</td>
              <td>{usertype}</td>
              <td>{id}</td>
              <td className='btnTD'>
                <Button variant="success" onClick={onApproveHandler}>
                  Approve
                </Button>
                <Button variant="primary" onClick={handleShowUserDataModal}>
                  Show User Data
                </Button>
              </td>
            </tr>
      <Modal show={showUserDataModal} onHide={handleCloseUserDataModal}>
        <Modal.Header>
          <Modal.Title>User Details for: {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Usertype: {usertype}</p>
            <p>Father's Name: {fatherName}</p>
            <p>Date of Birth: {dateOfBirth}</p>
            <p>Gender: {gender}</p>
            <p>Qualification: {qualification}</p>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserDataModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
};

export default Pending_student;
