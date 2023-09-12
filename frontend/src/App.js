import { MyContext } from './services/MyContext';
import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Sehir from './pages/city/Sehir';
import OffcanvasExample from './components/navbars/OffCanvas';
// import RegisterForm from './pages/RegisterForm';
import Footer from './components/Footer';
import NoPage from './pages/NoPage';
import Category from './pages/category/Category';
import Continent from './pages/continent/Continent';
import AddCity from './pages/city/AddCity';
import AdminNavbar from './components/navbars/AdminNavbar';
import AddContinent from './pages/continent/AddContinent';
import UpdateContinent from './pages/continent/UpdateContinent';
import DeleteContinent from './pages/continent/DeleteContinent';
import DeleteArticle from './pages/city/DeleteArticle';
import DeleteCategory from './pages/category/DeleteCategory';
import UpdateCategory from './pages/category/UpdateCategory';
import AddCategory from './pages/category/AddCategory';
import ProtectedRoute from './components/ProtectedRoute';
import Admin from './pages/Admin';
import Login from './pages/Login';

function App() {
  const adminPath = "/admin";
  let location = useLocation();
  let renderAdminNavbarForAdmin = location.pathname.startsWith(adminPath);
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [appData, setAppData] = useState({
    continentData: [],
    data: [],
    categoryData: [],
    categoryArticleData: [],
    imageUrls: [],
    cityImageUrls: []
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [continentData, categoryArticleData, categoryData, imageUrls, cityImageUrls, data] = await Promise.all([
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/get-all-continent-categories").then(res => res.json()),
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/print-all-category-articles").then(res => res.json()),
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/Find-Category").then(res => res.json()),
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/all-country-images").then(res => res.json()),
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/all-city-images").then(res => res.json()),
          fetch("https://dunyasehirlericom-598d89e9dae9.herokuapp.com/").then(res => res.json())
        ]);

        setAppData({ continentData, data, categoryData, imageUrls, cityImageUrls, categoryArticleData });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
      setIsAdminPage(renderAdminNavbarForAdmin);
  }, [renderAdminNavbarForAdmin]);

  return (
      <div className="App">
        <MyContext.Provider value={appData}>
        {isAdminPage ? <AdminNavbar /> : <OffcanvasExample />}
          <Switch>
            <ProtectedRoute exact path="/admin" component={Admin} />
            <ProtectedRoute exact path="/admin/add-continent" component={AddContinent} />
            <ProtectedRoute exact path="/admin/update-continent" component={UpdateContinent} />
            <ProtectedRoute exact path="/admin/delete-continent" component={DeleteContinent} />
            <ProtectedRoute exact path="/admin/add-country" component={AddCategory} />
            <ProtectedRoute exact path="/admin/update-country" component={UpdateCategory} />
            <ProtectedRoute exact path="/admin/delete-country" component={DeleteCategory} />
            <ProtectedRoute exact path="/admin/add-article" component={AddCity} />
            <ProtectedRoute exact path="/admin/delete-article" component={DeleteArticle} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/şehir/:cityName" component={Sehir} />
            <Route exact path="/ülke/:countryName" component={Category} />
            <Route exact path="/kıta/:continentName" component={Continent} />
            <Route exact path="/" component={Home} />
            <Route component={NoPage} />
          </Switch>
          <Footer />
        </MyContext.Provider>
      </div>
  );
}

export default App;
