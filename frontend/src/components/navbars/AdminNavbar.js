import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

function AdminNavbar() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    // Perform any additional logout-related actions here
    history.push('/');
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <Nav.Link to="/admin" as={Link} className='fw-bold'>Admin Panel</Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="City">
              <Nav.Link to="/admin/add-article" as={Link}>Add City</Nav.Link>
              <Nav.Link to="/admin/delete-article" as={Link}>Delete City</Nav.Link>
              <Nav.Link to="/admin/update-article" as={Link}>Update City</Nav.Link>
          </NavDropdown>
            <NavDropdown title="Country">
              <Nav.Link to="/admin/add-country" as={Link}>Add Country</Nav.Link>
              <Nav.Link to="/admin/delete-country" as={Link}>Delete Country</Nav.Link>
              <Nav.Link to="/admin/update-country" as={Link}>Update Country</Nav.Link>
            </NavDropdown>
            <NavDropdown title="Continent">
              <Nav.Link to="/admin/add-continent" as={Link}>Add Continent</Nav.Link>
              <Nav.Link to="/admin/delete-continent" as={Link}>Delete Continent</Nav.Link>
              <Nav.Link to="/admin/update-continent" as={Link}>Update Continent</Nav.Link>
            </NavDropdown>
            <Button variant="danger" className='me-0' onClick={handleLogout}>Çıkış</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;