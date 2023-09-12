import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { MyContext } from '../../services/MyContext';
import Image from 'react-bootstrap/esm/Image';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet';

function Sehir(){
    const { data, cityImageUrls } = useContext(MyContext);
    const { cityName } = useParams();

    return(
        <Container>
            <Helmet>
                <title>World Cities {cityName} Page</title>
                <meta name="description" content={cityName} />
                {/* <link rel="canonical" href="https://www.example.com/my-page" /> */}
            </Helmet>
            {data.map(x=>x.name===cityName && <div className='row'><div className='col-sm-12 col-md-12 col-lg-9 mx-auto'>
            {cityImageUrls.map(y=>y.key === x.imageUrl && <><Image className="w-100" variant="top" src={y.url} alt={x.name} key={x.name} loading="lazy"/><p dangerouslySetInnerHTML={{ __html: x.metin}}></p></>)}
            </div></div>)}
        </Container>
    );
}

export default Sehir;