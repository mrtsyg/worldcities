import { useContext } from 'react';
import { MyContext } from '../../services/MyContext';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet';

function Continent() {
  const { continentData, imageUrls } = useContext(MyContext);
  const { continentName } = useParams();

  const filteredContinent = continentData.filter((x) => x.title === continentName);

  // Handle the case where the continent is not found
  if (filteredContinent.length === 0) {
    return "";
  }

  return (
    <Container>
      <Helmet>
        <title>World Cities Continent Page</title>
        <meta name="description" content="Continent page" />
        {/* <link rel="canonical" href="https://www.example.com/my-page" /> */}
      </Helmet>
      <Row>
        {filteredContinent[0].categories.map((x) => (
          <Col key={x.title} sm={12} md={6} lg={3} className='g-4'>
            <Card>
            <Card.Link key={x.title} href={`/ülke/${x.title}`} className='fs-3 fw-bold link-dark text-decoration-none'>
            {imageUrls.map(y=>y.key === x.categoryImage ? <Card.Img variant="top" src={y.url} alt={x.title} key={x.title} loading="lazy" /> : "")}
              {/* <Card.Img variant="top" src={`../images/${x.categoryImage}`} alt={x.title} key={x.title} loading="lazy" /> */}
              <Card.Body className='bg-warning'>
              {x.title}
              </Card.Body>
            </Card.Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Continent;
