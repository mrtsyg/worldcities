import MyCard from '../components/Card';
import { Helmet } from 'react-helmet';

function Home() {

  return (
    <div className="Home">
      <Helmet>
        <title>World Cities Home Page</title>
        <meta name="description" content="Information about World cities" />
        {/* <link rel="canonical" href="https://www.example.com/my-page" /> */}
      </Helmet>
      <MyCard />
    </div>
  );
}

export default Home;
