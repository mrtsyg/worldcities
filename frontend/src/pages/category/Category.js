import { useContext } from 'react';
import { MyContext } from '../../services/MyContext';
import Container from 'react-bootstrap/esm/Container';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Helmet } from 'react-helmet';

function Category() {
  const { categoryArticleData, cityImageUrls} = useContext(MyContext);
  const { countryName } = useParams();

  if (!categoryArticleData) {
    return (
      <Container>
        <div>Country not found.</div>
      </Container>
    );
  }

  const filteredCategory = categoryArticleData.filter((x) => x.title === countryName);

  if (filteredCategory.length === 0) {
    return "";
  }

  return (
    <Container>
    <Helmet>
        <title>World Cities {countryName} Page</title>
        <meta name="description" content={countryName}/>
        {/* <link rel="canonical" href="https://www.example.com/my-page" /> */}
    </Helmet>
    <Row>
    {filteredCategory[0].articles.map((article, index)=>article.isCard === true && <Col sm={12} md={6} lg={3} className='g-4'><Card>
      <Card.Link key={index} href={`/şehir/${article.name}`} className='fs-3 fw-bold link-dark text-decoration-none'>
      {cityImageUrls.map(y=>y.key === article.imageUrl ? <Card.Img variant="top" src={y.url} alt={article.name} key={article.name} loading="lazy" /> : "")}
          <Card.Body className='bg-warning'>
              {article.title}
          </Card.Body>
      </Card.Link>
    </Card></Col>)}
      </Row>
    </Container>
  );
}

export default Category;
