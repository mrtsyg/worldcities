import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext } from 'react';
import { MyContext } from '../../services/MyContext';
import Modal from 'react-bootstrap/Modal';
// import LoginForm from '../LoginForm';
import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";


function OffcanvasExample() {
  const [searchQuery, setSearchQuery] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
  // const { data, setData } = useContext(MyContext);
  const { continentData } = useContext(MyContext);
  // const history = useHistory();

  // const [show, setShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleSearchClose = () => {
    setSearchShow(false);
    setSearchQuery(null);
  };

  const handleLinkClick = () => {
    setSearchShow(false);
    setSearchQuery(null);
  }

  const handleSearchShow = () => setSearchShow(true);

  useEffect(()=>{
    const handleSearch = async () => {
      try {
        await fetch(`https://dunyasehirlericom-598d89e9dae9.herokuapp.com/search?query=${searchQuery}`, {
          method: 'GET'
        }).then(res => res.json()).then((data)=>{setSearchResults(data); console.log(data)})
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    handleSearch();
  },[searchQuery]);

  return (
    <>
        <Navbar bg="dark" data-bs-theme="dark" expand="sm" className="bg-body-tertiary mb-3">
          <Container 
          fluid>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-sm" />
            <Navbar.Brand>
              <Nav.Link to="/" as={Link} className='fw-bold'>Dünya Şehirleri</Nav.Link>
            </Navbar.Brand>
            
            <Navbar.Offcanvas
              id="offcanvasNavbar-expand-sm"
              aria-labelledby="offcanvasNavbarLabel-expand-sm"
              placement="end"
              className="w-50 bg-dark"
            >
              <Offcanvas.Header className='text-light'>
                <Offcanvas.Title id="offcanvasNavbarLabel-expand-sm">
                  Dünya Şehirleri
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-center flex-grow-1 pe-3">
                  {continentData.map(x=><Nav.Link to={`/kıta/${x.title}`} as={Link} key={x.title} className='fw-bold text-warning me-3'>{x.title}</Nav.Link>)}
                  {/* <NavDropdown
                    title="Dropdown"
                    id="offcanvasNavbarDropdown-expand-sm"
                  >
                        {data.map((x) => (
                          <NavDropdown.Item to={`/şehir/${x.name}`} as={Link} key={x.name}>
                            {x.name}
                          </NavDropdown.Item>
                        ))}
                    
                    <NavDropdown.Divider />
                    <NavDropdown.Item to="/" as={Link}>
                      Home
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                {/* <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Üye Girişi</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <LoginForm />
                  </Modal.Body>
                  <Modal.Footer>
                      <h6>Üye değil misiniz?</h6>
                      <Button variant="danger" to="user/register" as={Link} id="subscribeButton" onClick={handleClose}>
                          Üye Ol
                      </Button>
                  </Modal.Footer>
                </Modal> */}
                <Modal
                  show={searchShow}
                  onHide={handleSearchClose}
                  keyboard={false}
                >
                  <Modal.Body>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Ara"
                        className="me-2"
                        aria-label="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </Form>
                    { searchResults.cities !== undefined && searchResults.cities.length > 0 && searchResults.cities.map(x=>
                        <Card key={x.name}>
                          <Card.Body><Card.Link to={`/şehir/${x.name}`} as={Link} key={x.title} className='fw-bold ms-3' onClick={handleLinkClick}>{x.title}</Card.Link></Card.Body>
                        </Card>
                      )
                    }
                    {
                      searchResults.countries !== undefined && searchResults.countries.length > 0 && searchResults.countries.map(x=>
                        <Card key={x.title}>
                          <Card.Body><Card.Link to={`/ülke/${x.title}`} as={Link} key={x.title} className='fw-bold ms-3' onClick={handleLinkClick}>{x.title} </Card.Link></Card.Body>
                        </Card>
                      )
                    }
                    {
                      searchResults.continents !== undefined && searchResults.continents.length > 0 && searchResults.continents.map(x=>
                        <Card key={x.title}>
                          <Card.Body><Card.Link to={`/kıta/${x.title}`} as={Link} key={x.title} className='fw-bold ms-3' onClick={handleLinkClick}>{x.title}</Card.Link></Card.Body>
                        </Card>
                      )
                    }
                  </Modal.Body>
                </Modal>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Button variant="success" className='ms-2' onClick={handleSearchShow}><FaSearch size={20} /></Button>
            {/* <Button variant="success" className='ms-2' onClick={handleShow}><FaUser size={20} /></Button> */}
          </Container>
        </Navbar>
    </>
  );
}

export default OffcanvasExample;