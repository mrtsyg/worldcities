import Card from 'react-bootstrap/Card';
import { useContext } from "react";
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyContext } from '../services/MyContext';

function MyCard() {
    const {data, cityImageUrls} = useContext(MyContext);
        
  return (
    <Container>
    <Row>
    {data.map(x=>x.isCard === true && <Col xs={12} md={6} lg={3} className='g-4'><Card>
    <Card.Link href={`/şehir/${x.name}`} className='fs-3 fw-bold link-dark text-decoration-none'>
    {cityImageUrls.map(y=>(y.key === x.imageUrl) && <Card.Img variant="top" src={y.url} alt={x.name} key={x.name} loading="lazy" />)}
        <Card.Body className='bg-warning'>
            {x.name}
        </Card.Body>
        </Card.Link>
      </Card></Col>)}
      </Row>
    </Container>
  );
}

export default MyCard;