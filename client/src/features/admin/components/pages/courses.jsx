import { React, useContext, useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Form from 'react-bootstrap/Form';
import { FormSelect, Table, Row, Col, Modal, Button } from 'react-bootstrap';
import '../../mainadmin.css';
import Course from './course';
import AdminContext from '../../../../context/admin/admincontext';
function Courses() {
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [loading, setLoading] = useState(true);
  const { getAllCourses, courses, faculties, getAllFaculty, addCourse } =
    useContext(AdminContext);

  const handleAddNewCourse = () => {
    setShowAddCourse(true);
  };
  const handleCloseAddCourse = () => setShowAddCourse(false);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([getAllCourses(), getAllFaculty()]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Add course get data
  const [course, setCourse] = useState({
    name: '',
    teacher: '',
    teacher_id: '',
    start_date: '',
    classes_days: '',
    total_days: '',
  });
  useEffect(() => {
    faculties.forEach((faculty) => {
      if (faculty.name === course.teacher) {
        setCourse((prevData) => {
          return {
            ...prevData,
            teacher_id: faculty._id,
          };
        });
      }
    });
  }, [course.teacher]);

  const onChangeHandler = (e) => {
    setCourse((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const onSumitCourseHandler = (e) => {
    e.preventDefault();

    // Now, you can send the request with the updated course object
    setCourse({
      name: '',
      teacher: '',
      start_date: '',
      classes_days: '',
      total_days: '',
    });

    addCourse(course);

    console.log(course);
  };
  return (
    <div className="container">
      <div className="addCoursebtn">
        <Button variant="success" onClick={handleAddNewCourse}>
          Add Course
        </Button>
      </div>
      <Row>
        <Col xs={12}>
          {loading ? (
            <div className="loading">
              {/* Loading indicator (e.g., spinner or loading gif) */}
              Loading...
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead style={{ textAlign: 'center' }}>
                <tr>
                  <th>Course Name</th>
                  <th>Teacher</th>
                  <th>Start Date</th>
                  <th>Clases date</th>
                  <th>Total Days</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.length > 0 ? courses.map((item) => {
                  return (
                    <Course
                      key={item._id}
                      id={item._id}
                      name={item.name}
                      teacher={item.teacher}
                      start_date={item.start_date}
                      total_days={item.total_days}
                      students={item.students}
                      classes_days={item.classes_days}
                    />
                  );
                }) : ""}
              </tbody>
            </Table>
          )}
        </Col>

        <Modal show={showAddCourse} onHide={handleCloseAddCourse}>
          <Modal.Header>
            <Modal.Title>Add New Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Floating className="mb-3">
              <Form.Control
                id="course_name"
                type="text"
                placeholder="Course_name"
                name="name"
                value={course.name}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingInputCustom">Course Name</label>
            </Form.Floating>
            <Form.Floating>
              <FormSelect
                id="teacher"
                name="teacher"
                value={course.teacher}
                onChange={onChangeHandler}
              >
                <option>Select Teacher</option>
                {faculties.length > 0
                  ? faculties.map((faculty) => (
                      <option
                        key={faculty.id}
                        value={faculty.id}
                        id={faculty.id}
                      >
                        {faculty.name}
                      </option>
                    ))
                  : ''}
              </FormSelect>
              <label htmlFor="floatingTeacherCustom">Teacher</label>
            </Form.Floating>

            <Form.Floating className="mt-3">
              <Form.Control
                id="start_date"
                type="date"
                placeholder="start_date"
                name="start_date"
                value={course.start_date}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingStartDateCustom">Start Date</label>
            </Form.Floating>
            <Form.Floating className="mt-3">
              <Form.Control
                id="classes_days"
                type="text"
                placeholder="days"
                name="classes_days"
                value={course.classes_days}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingClassDateCustom">Clases days</label>
            </Form.Floating>
            <Form.Floating className="mt-3">
              <Form.Control
                id="total_days"
                type="number"
                placeholder="total_days"
                name="total_days"
                value={course.total_days}
                onChange={onChangeHandler}
              />
              <label htmlFor="floatingClassDateCustom">Total days</label>
            </Form.Floating>
            <div className="addCoursebtn">
              <Button variant="primary" onClick={onSumitCourseHandler}>
                Add
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddCourse}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </div>
  );
}

export default Courses;
