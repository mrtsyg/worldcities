import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
      <footer className="bg-light pb-0 pt-4">
        <Container>
          <Row>
            <Col xs={12} className="text-center">
              <p>&copy; {new Date().getFullYear()} dünyaşehirleri.com Tüm hakları saklıdır.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  
  export default Footer;
  