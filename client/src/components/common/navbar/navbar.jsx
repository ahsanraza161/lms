import '../../../global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLocation, Link } from 'react-router-dom';
function Topbar() {
  const path = useLocation();
  return (
    <>
      <Navbar
        className="navSmart containerNav"
        data-bs-theme="dark"
        expand="lg"
        fixed="top"
      >
        <Container style={{
          display: 'flex',
          justifyContent: 'space-between'
        }
        }>
          <div>
          <Navbar.Brand href="/">LMS-KIT</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>
          <div>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className=" navmain align-items-center">
              <Link
                className={location.pathname === '/' ? 'regnavitem ' : ''}
                to="/"
              >
                Home
              </Link>
              <Link
                className={location.pathname === '/about' ? 'regnavitem ' : ''}
                to="/about"
              >
                About
              </Link>
              <Link
                className={location.pathname === '/login' ? 'regnavitem ' : ''}
                to="/login"
              >
                Login
              </Link>
              <Link
                className={
                  location.pathname === '/registration' ? 'regnavitem ' : ''
                }
                to="/registration"
              >
                Register
              </Link>
              <Link className="regnavitem navitem" to="https://karachi-it-educators.org/">
                Visit Website
              </Link>
            </Nav>
          </Navbar.Collapse>
            </div>
        </Container>
      </Navbar>
    </>
  );
}

export default Topbar;
